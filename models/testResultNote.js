const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const TestResultNote = sequelize.define('TestResultNotes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    testResultId: {
        type: DataTypes.INTEGER,
        references: { model: 'TestResults', key: 'id' }
    },
    noteId: {
        type: DataTypes.INTEGER,
        references: { model: 'Notes', key: 'id' }
    }
}, { timestamps: false })

module.exports = TestResultNote