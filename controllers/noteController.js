const Note = require('../models/note')

const getAllNotes = async (req, res) => {
    try {
        const data = await Note.findAll()

        if(!data || data.length === 0) {
            return res.status(200).json([])
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const getNote = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Note.findByPk(id)

        if(!data.id) {
            return res.status(404).json({ message: 'Note not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const addNote = async (req, res) => {
    const { title, body } = req.body

    if(!title || !body) {
        return res.status(400).json({ message: '[FAILED] Title and body are required!' })
    } 

    try {
        const newNote = await Note.create({ title, body })
        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

module.exports = { getAllNotes, getNote, addNote }