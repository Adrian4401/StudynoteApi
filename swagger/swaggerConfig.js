const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        info: {
            title: 'Notes API',
            version: '0.2',
            description: 'An API for app with notes and users.'
        },
        openapi: '3.0.0',
    },
    apis: ['app.js', './routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
module.exports = swaggerDocs