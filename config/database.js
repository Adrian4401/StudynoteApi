const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('studynoteapi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize