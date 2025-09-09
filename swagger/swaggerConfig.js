const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Notes API',
            version: '0.2',
            description: 'An API for app with notes and users.'
        }
    },
    apis: ['app.js', './routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
module.exports = swaggerDocs