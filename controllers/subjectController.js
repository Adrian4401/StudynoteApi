const { Note, Subject, User } = require('../models')

const getAllSubjects = async (req, res) => {
    try {
        const data = await Subject.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['username']
            }],
            where: { userId: req.user.id, isDeleted: false }
        })

        if (!data || data.length === 0) return res.status(200).json([])

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[Error]: ${error.message}` })
    }
}

const getSubject = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Subject.findOne({
            include: [{
                model: User,
                as: 'user',
                attributes: ['username']
            }],
            where: { id, userId: req.user.id, isDeleted: false }
        })

        if (!data) return res.status(404).json({ message: 'Subject not found' })

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const addSubject = async (req, res) => {
    const { name, userId } = req.body

    if (!name || name.length <= 0) return res.status(400).json({ message: 'Name is required!' })
    
    try {
        const newSubject = await Subject.create({ name, userId })
        res.status(201).json(newSubject)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const updateSubject = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if (!name || name.length <= 0) return res.status(400).json({ message: 'Name is required!' })

    try {
        const [updatedCount] = await Subject.update(
            { name },
            { where: { id, userId: req.user.id } }
        )

        if (updatedCount === 0) return res.status(404).json({ message: `[WARN] Subject not found` })

        res.status(200).json({ message: `[INFO] Subject edited` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const deleteSubject = async (req, res) => {
    const { id } = req.params

    try {
        const [deletedCount] = await Subject.update(
            { isDeleted: true },
            { where: { id, userId: req.user.id } }
        )

        if (deletedCount === 0) return res.status(404).json({ message: `[WARN] Subject not found` })

        res.status(200).json({ message: `[INFO] Subject deleted` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

module.exports = { getAllSubjects, getSubject, addSubject, updateSubject, deleteSubject }