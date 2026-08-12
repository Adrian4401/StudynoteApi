const { TestResult, Subject, Note } = require('../models')

const getTestHistory = async (userId) => {
    return await TestResult.findAll({
        where: { userId, isDeleted: false },
        attributes: ['id', 'title', 'score', 'maxScore', 'percentage', 'createdAt'],
        include: [{ model: Subject, as: 'subject', attributes: ['id', 'name'] }],
        order: [['createdAt', 'DESC']]
    })
}

const getTestResult = async (id, userId) => {
    return await TestResult.findOne({
        where: { id, userId, isDeleted: false },
        include: [
            { model: Subject, as: 'subject', attributes: ['id', 'name'] },
            { model: Note, as: 'notes', attributes: ['id', 'title'], through: { attributes: [] } }
        ]
    })
}

const addTestResult = async (data) => {
    const testResult = await TestResult.create(data)

    if (Array.isArray(data.noteIds) && data.noteIds.length > 0) {
        await testResult.setNotes(data.noteIds)
    }

    return await getTestResult(testResult.id, data.userId)
}

const deleteTestResult = async (id, userId) => {
    return await TestResult.update(
        { isDeleted: true },
        { where: { id, userId, isDeleted: false } }
    )
}

module.exports = { getTestHistory, getTestResult, addTestResult, deleteTestResult }