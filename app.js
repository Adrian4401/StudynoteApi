const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger/swaggerConfig')
const sequelize = require('./config/database')

const PORT = 8080
const noteRoutes = require('./routes/notes')

const app = express()

require('./models/note')

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!')
    })
    .catch((error) => {
        console.log('[ERROR]: Syncing database: ', error)
    })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
console.log(swaggerDocs)

app.use(express.json())
app.use('/notes', noteRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port 8080!')
})