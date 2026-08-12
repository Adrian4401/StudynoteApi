const subjectTestSchema = {
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
                        enum: [
                            'single_choice',
                            'multiple_choice',
                            'true_false',
                            'open'
                        ]
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
                required: [
                    'id',
                    'type',
                    'question',
                    'answers',
                    'expectedAnswer',
                    'explanation'
                ]
            }
        }
    },
    required: ['questions']
}

const openAnswersCheckSchema = {
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
                    isCorrect: { type: 'boolean' },
                    points: { type: 'number' },
                    maxPoints: { type: 'number' },
                    feedback: { type: 'string' },
                    correctAnswer: { type: 'string' }
                },
                required: [
                    'questionId',
                    'isCorrect',
                    'points',
                    'maxPoints',
                    'feedback',
                    'correctAnswer'
                ]
            }
        }
    },
    required: ['results']
}

module.exports = {
    subjectTestSchema,
    openAnswersCheckSchema
}