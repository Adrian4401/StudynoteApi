const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const TestResult = sequelize.define('TestResult', {
    title: { type: DataTypes.STRING, allowNull: false },
    score: { type: DataTypes.FLOAT, allowNull: false },
    maxScore: { type: DataTypes.FLOAT, allowNull: false },
    percentage: { type: DataTypes.INTEGER, allowNull: false },
    questions: { type: DataTypes.JSON, allowNull: false },
    userAnswers: { type: DataTypes.JSON, allowNull: false },
    openAnswersResults: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Subjects', key: 'id' }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
    }
})

module.exports = TestResult