const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger/swaggerConfig')
const sequelize = require('./config/database')

const PORT = 8080
const noteRoutes = require('./routes/notes')
const authRoutes = require('./routes/auth')
const subjectRoutes = require('./routes/subjects')

const app = express()

require('./models/note')
require('./models/auth')
require('./models/subject')

sequelize.sync()
    .then(() => {
        console.log('[INFO] Database connected & tables created!')
    })
    .catch((error) => {
        console.log('[ERROR] Syncing database: ', error)
    })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
console.log(swaggerDocs)

app.use(express.json())
app.use('/notes', noteRoutes)
app.use('/auth', authRoutes)
app.use('/subjects', subjectRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port 8080!')
})