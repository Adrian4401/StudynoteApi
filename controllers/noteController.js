const { Note, Subject, User } = require('../models')

const getAllNotes = async (req, res) => {
    try {
        const data = await Note.findAll({ 
            include: [
                {
                    model: Subject,
                    as: 'subject',
                    attributes: ['name']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['username']
                }
            ]
        })

        if(!data || data.length === 0) return res.status(200).json([])

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const getNote = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Note.findByPk(
            id,
            {
                include: [
                    {
                        model: Subject,
                        as: 'subject',
                        attributes: ['name']
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['username']
                    }
                ]
            } 
        )

        if(!data.id) return res.status(404).json({ message: 'Note not found' })

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const addNote = async (req, res) => {
    const { title, body, subjectId, userId } = req.body

    if(!title || !body) return res.status(400).json({ message: '[FAILED] Title and body are required!' })

    try {
        const newNote = await Note.create({ title, body, subjectId, userId })
        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const updateNote = async (req, res) => {
    const { id } = req.params
    const { title, body, subjectId, userId } = req.body

    if(!title || !body) return res.status(400).json({ message: '[FAILED] Title and body are required!' })

    try {
        const [updatedCount] = await Note.update(
            { title, body, subjectId, userId },
            { where: { id } }
        )

        if (updatedCount === 0) return res.status(404).json({ message: `[WARN] Note not found` })
        
        res.status(201).json({ message: `[INFO] Subject edited` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCount = await Note.destroy({ where: { id } })

        if (deletedCount === 0) return res.status(404).json({ message: `[WARN] Note not found` })

        res.status(200).json({ message: `[INFO] Note deleted` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

module.exports = { getAllNotes, getNote, addNote, updateNote, deleteNote }