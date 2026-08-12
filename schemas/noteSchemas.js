const noteAnalysisSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        summary: {
            type: 'string'
        },
        suggestedAdditions: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        unclearParts: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        improvedNote: {
            type: 'object',
            additionalProperties: false,
            properties: {
                title: {
                    type: 'string'
                },
                body: {
                    type: 'string'
                }
            },
            required: ['title', 'body']
        }
    },
    required: [
        'summary',
        'suggestedAdditions',
        'unclearParts',
        'improvedNote'
    ]
}

module.exports = {
    noteAnalysisSchema
}