const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        info: {
            title: 'Notes API',
            version: '1.0',
            description: 'An API for a mobile "StudyNote" app with events, notes, subjects and users with authentication.'
        },
        openapi: '3.0.0',
    },
    apis: ['app.js', './routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
module.exports = swaggerDocs