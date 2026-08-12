const noteService = require('../services/noteService')
const { generateJson } = require('../services/aiService')
const {
    subjectTestSchema,
    openAnswersCheckSchema
} = require('../schemas/testSchemas')

const allowedQuestionTypes = [
    'single_choice',
    'multiple_choice',
    'true_false',
    'open'
]

const ensureQuestionsHaveQuestionMark = (questions) => {
    return questions.map((question) => {
        const trimmedQuestion = question.question.trim()

        return {
            ...question,
            question: trimmedQuestion.endsWith('?')
                ? trimmedQuestion
                : `${trimmedQuestion}?`
        }
    })
}

const normalizeQuestionTypes = (questionTypes) => {
    if (!Array.isArray(questionTypes)) {
        return []
    }

    return questionTypes.filter((type) => allowedQuestionTypes.includes(type))
}

const generateSubjectTest = async (req, res) => {
    const {
        noteIds,
        questionsCount,
        questionTypes
    } = req.body

    if (
        !Array.isArray(noteIds) ||
        noteIds.length === 0 ||
        !questionsCount ||
        !Array.isArray(questionTypes) ||
        questionTypes.length === 0
    ) {
        return res.status(400).json({ errorCode: 'MISSING_FIELDS' })
    }

    const selectedQuestionTypes = normalizeQuestionTypes(questionTypes)

    if (selectedQuestionTypes.length === 0) {
        return res.status(400).json({ errorCode: 'INVALID_QUESTION_TYPES' })
    }

    const parsedQuestionsCount = Number(questionsCount)

    if (
        Number.isNaN(parsedQuestionsCount) ||
        parsedQuestionsCount < 5 ||
        parsedQuestionsCount > 20
    ) {
        return res.status(400).json({ errorCode: 'INVALID_QUESTIONS_COUNT' })
    }

    try {
        const notes = await noteService.getNotesByIds(noteIds, req.user.id)

        if (!notes || notes.length === 0) {
            return res.status(404).json({ errorCode: 'NOTES_NOT_FOUND' })
        }

        const notesText = notes.map((note, index) => {
            return `
                Notatka ${index + 1}
                Tytuł: ${note.title}
                Treść:
                ${note.body}
            `
        }).join('\n')

        const prompt = `
            Na podstawie poniższych notatek wygeneruj test dla studenta.

            Liczba pytań: ${parsedQuestionsCount}
            Dozwolone typy pytań: ${selectedQuestionTypes.join(', ')}

            Zasady:
            - Pytania mają wynikać TYLKO z treści notatek.
            - Nie dodawaj żadnych informacji, których nie da się wywnioskować z notatek.
            - Pytania formułuj jak normalne pytania egzaminacyjne, a nie pytania o same notatki.
            - Nie używaj sformułowań typu: "czy w notatkach stwierdzono", "według notatek", "na podstawie notatek".
            - Pole "question" zawsze musi być pytaniem i zawsze musi kończyć się znakiem zapytania.
            - Dla single_choice dokładnie jedna odpowiedź ma isCorrect true.
            - Dla multiple_choice jedna lub więcej odpowiedzi może mieć isCorrect true.
            - Dla true_false zwróć dokładnie dwie odpowiedzi: true i false.
            - Dla open zwróć answers jako pustą tablicę oraz expectedAnswer jako wzorcową odpowiedź.
            - Każde pytanie musi mieć explanation.
            - Zwróć wyłącznie poprawny JSON zgodny ze schematem.

            Notatki:
            ${notesText}
        `

        const result = await generateJson({
            prompt,
            schemaName: 'subject_test',
            schema: subjectTestSchema
        })

        return res.status(200).json({
            questions: ensureQuestionsHaveQuestionMark(result.questions || [])
        })
    } catch (error) {
        console.log('GENERATE SUBJECT TEST ERROR:', error)
        return res.status(500).json({ errorCode: 'GENERATE_TEST_ERROR' })
    }
}

const checkOpenAnswers = async (req, res) => {
    const { answers } = req.body

    if (!Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ errorCode: 'MISSING_FIELDS' })
    }

    try {
        const answersText = answers.map((answer, index) => {
            return `
                Odpowiedź ${index + 1}
                ID pytania: ${answer.questionId}
                Pytanie: ${answer.question}
                Odpowiedź użytkownika: ${answer.userAnswer}
                Odpowiedź wzorcowa: ${answer.expectedAnswer}
                Wyjaśnienie: ${answer.explanation}
            `
        }).join('\n')

        const prompt = `
            Sprawdź odpowiedzi otwarte użytkownika.

            Zasady:
            - Oceń każdą odpowiedź w skali od 0 do 1 punktu.
            - Przyznaj 1 punkt, jeśli odpowiedź jest merytorycznie poprawna.
            - Przyznaj 0.5 punktu, jeśli odpowiedź jest częściowo poprawna.
            - Przyznaj 0 punktów, jeśli odpowiedź jest błędna, pusta lub nie odpowiada na pytanie.
            - Nie wymagaj identycznego brzmienia jak odpowiedź wzorcowa.
            - Zwróć krótką informację zwrotną.
            - Zwróć wyłącznie poprawny JSON zgodny ze schematem.

            Odpowiedzi:
            ${answersText}
        `

        const result = await generateJson({
            prompt,
            schemaName: 'open_answers_check',
            schema: openAnswersCheckSchema
        })

        return res.status(200).json({
            results: result.results || []
        })
    } catch (error) {
        console.log('CHECK OPEN ANSWERS ERROR:', error)
        return res.status(500).json({ errorCode: 'CHECK_OPEN_ANSWERS_ERROR' })
    }
}

module.exports = {
    generateSubjectTest,
    checkOpenAnswers
}