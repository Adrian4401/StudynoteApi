const noteService = require('../services/noteService')

const getAllNotes = async (req, res) => {
    try {
        const data = await noteService.getAllNotes(req.user.id)
        if (!data || data.length === 0) return res.status(200).json([])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const getNote = async (req, res) => {
    const { id } = req.params

    try {
        const data = await noteService.getNote(id, req.user.id)
        if (!data) return res.status(404).json({ message: 'Note not found' })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const addNote = async (req, res) => {
    const { title, body, subjectId } = req.body

    if (!title || !body) return res.status(400).json({ message: '[FAILED] Title and body are required!' })

    try {
        const newNote = await noteService.addNote(title, body, subjectId, req.user.id)
        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const updateNote = async (req, res) => {
    const { id } = req.params
    const { title, body, subjectId } = req.body

    if (!title || !body) return res.status(400).json({ message: '[FAILED] Title and body are required!' })

    try {
        const [updatedCount] = await noteService.updateNote(id, title, body, subjectId, req.user.id)
        if (updatedCount === 0) return res.status(404).json({ message: `[WARN] Note not found` })
        res.status(201).json({ message: `[INFO] Subject edited` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: '[FAILED] Note ID is required!' })

    try {
        const [deletedCount] = await noteService.deleteNote(id, req.user.id)
        if (deletedCount === 0) return res.status(404).json({ message: `[WARN] Note not found` })
        res.status(200).json({ message: `[INFO] Note deleted` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

module.exports = { getAllNotes, getNote, addNote, updateNote, deleteNote }