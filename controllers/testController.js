const OpenAI = require('openai')
const noteService = require('../services/noteService')

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const generateSubjectTest = async (req, res) => {
    const { subjectId, noteIds, questionsCount, questionTypes } = req.body

    if (!subjectId || !Array.isArray(noteIds) || noteIds.length === 0 || !questionsCount || !Array.isArray(questionTypes) || questionTypes.length === 0) {
        return res.status(400).json({ errorCode: 'TEST_MISSING_FIELDS' })
    }

    try {
        const notes = await noteService.getNotesByIds(noteIds, req.user.id)

        if (!notes || notes.length === 0) {
            return res.status(404).json({ errorCode: 'TEST_NOTES_NOT_FOUND' })
        }

        const notesText = notes.map(note => `
            Tytuł: ${note.title}
            Treść: ${note.body}
        `).join('\n---\n')

        const response = await client.responses.create({
            model: process.env.OPENAI_TEST_MODEL || 'gpt-5-mini',
            input: `
                Na podstawie poniższych notatek wygeneruj test dla studenta.

                Liczba pytań: ${questionsCount}
                Dozwolone typy pytań: ${questionTypes.join(', ')}

                Zasady:
                - Pytania mają wynikać TYLKO z faktów i informacji zawartych w notatkach.
                - Nie dodawaj żadnych informacji, które nie wynikają z notatek.
                - Formułuj pytania tak, jakby test sprawdzał wiedzę studenta, a nie pamięć treści notatek.
                - Nie używaj sformułowań typu: "czy w notatkach stwierdzono", "według notatek", "na podstawie notatek", "w tekście napisano", "autor napisał".
                - Pytania mają dotyczyć bezpośrednio faktów, pojęć, definicji i zależności z materiału.
                - Dla single_choice dokładnie jedna odpowiedź ma isCorrect true.
                - Dla multiple_choice jedna lub więcej odpowiedzi może mieć isCorrect true.
                - Dla true_false zwróć dwie odpowiedzi: true i false.
                - Dla open zwróć expectedAnswer zamiast answers.
                - Każde pytanie musi mieć explanation.

                Przykład złego pytania:
                "Czy w notatkach stwierdzono, że Blender jest programem płatnym?"

                Przykład dobrego pytania:
                "Czy Blender jest programem płatnym?"

                Notatki:
                ${notesText}
            `,
            text: {
                format: {
                    type: 'json_schema',
                    name: 'subject_test',
                    strict: true,
                    schema: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            questions: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    additionalProperties: false,
                                    properties: {
                                        id: { type: 'string' },
                                        type: {
                                            type: 'string',
                                            enum: ['true_false', 'single_choice', 'multiple_choice', 'open']
                                        },
                                        question: { type: 'string' },
                                        answers: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                additionalProperties: false,
                                                properties: {
                                                    id: { type: 'string' },
                                                    text: { type: 'string' },
                                                    isCorrect: { type: 'boolean' }
                                                },
                                                required: ['id', 'text', 'isCorrect']
                                            }
                                        },
                                        expectedAnswer: { type: 'string' },
                                        explanation: { type: 'string' }
                                    },
                                    required: ['id', 'type', 'question', 'answers', 'expectedAnswer', 'explanation']
                                }
                            }
                        },
                        required: ['questions']
                    }
                }
            }
        })

        const result = JSON.parse(response.output_text)

        return res.status(200).json(result)
    } catch (error) {
        console.log('GENERATE SUBJECT TEST ERROR:', error)
        return res.status(500).json({ errorCode: 'TEST_GENERATE_ERROR' })
    }
}

const checkOpenAnswers = async (req, res) => {
    const { openAnswers } = req.body

    if (!Array.isArray(openAnswers) || openAnswers.length === 0) {
        return res.status(400).json({ errorCode: 'OPEN_ANSWERS_MISSING_FIELDS' })
    }

    try {
        const response = await client.responses.create({
            model: process.env.OPENAI_TEST_MODEL || 'gpt-5-mini',
            input: `
                Oceń odpowiedzi użytkownika na pytania otwarte.

                Zasady oceniania:
                - Każda odpowiedź ma score od 0 do 1.
                - 1 oznacza odpowiedź w pełni poprawną.
                - 0.5 oznacza odpowiedź częściowo poprawną.
                - 0 oznacza odpowiedź błędną albo pustą.
                - Bądź sprawiedliwy: nie wymagaj identycznych słów jak we wzorcowej odpowiedzi.
                - Jeśli sens odpowiedzi użytkownika zgadza się z oczekiwaną odpowiedzią, daj wysoki wynik.
                - Daj krótką informację zwrotną w języku aplikacji.

                Odpowiedzi do oceny:
                ${JSON.stringify(openAnswers, null, 2)}
            `,
            text: {
                format: {
                    type: 'json_schema',
                    name: 'open_answers_check',
                    strict: true,
                    schema: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            results: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    additionalProperties: false,
                                    properties: {
                                        questionId: { type: 'string' },
                                        score: { type: 'number' },
                                        maxScore: { type: 'number' },
                                        isCorrect: { type: 'boolean' },
                                        feedback: { type: 'string' }
                                    },
                                    required: [
                                        'questionId',
                                        'score',
                                        'maxScore',
                                        'isCorrect',
                                        'feedback'
                                    ]
                                }
                            }
                        },
                        required: ['results']
                    }
                }
            }
        })

        const result = JSON.parse(response.output_text)

        return res.status(200).json(result)
    } catch (error) {
        console.log('CHECK OPEN ANSWERS ERROR:', error)
        return res.status(500).json({ errorCode: 'OPEN_ANSWERS_CHECK_ERROR' })
    }
}

module.exports = { generateSubjectTest, checkOpenAnswers }