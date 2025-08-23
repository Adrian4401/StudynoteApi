const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Subject = require('./subject')

const Note = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: DataTypes.TEXT,
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Subjects',
            key: 'id'
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = Note