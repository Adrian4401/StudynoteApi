const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger/swaggerConfig')

const PORT = 8080
const noteRoutes = require('./routes/notes')

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
console.log(swaggerDocs)



app.use(express.json())
app.use('/notes', noteRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port 8080!')
})