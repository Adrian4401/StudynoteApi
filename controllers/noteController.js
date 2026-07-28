const noteService = require('../services/noteService')
const OpenAI = require('openai')
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const getAllNotes = async (req, res) => {
    try {
        const data = await noteService.getAllNotes(req.user.id)
        res.status(200).json(data)
    } catch (error) {
        console.log('GET ALL NOTES ERROR:', error)
        res.status(500).json({ errorCode: 'NOTES_ALL_SERVER_ERROR' })
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
    const { title, body, subjectId, classId } = req.body

    if (!title || title.trim().length <= 0 || !body || body.trim().length <= 0 || !subjectId || !classId) return res.status(400).json({ errorCode: 'MISSING_FIELDS' })

    try {
        const newNote = await noteService.addNote(title.trim(), body.trim(), subjectId, classId, req.user.id)
        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ errorCode: 'NOTES_ADD_ERROR' })
    }
}

const updateNote = async (req, res) => {
    const { id } = req.params
    const { title, body, subjectId, classId } = req.body

    if (!title || !body || !subjectId || !classId) return res.status(400).json({ errorCode: 'MISSING_FIELDS' })

    try {
        const [updatedCount] = await noteService.updateNote(id, title, body, subjectId, classId, req.user.id)
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

// AI functions

const analyzeNote = async (req, res) => {
    const { id } = req.params

    try {
        const note = await noteService.getNote(id, req.user.id)

        if (!note) {
            return res.status(404).json({ errorCode: 'NOTE_NOT_FOUND' })
        }

        const response = await client.responses.create({
            model: 'gpt-5-mini',
            input: `
                Przeanalizuj tę notatkę studenta i zaproponuj usprawnienia.
                Zwróć:
                1. krótkie podsumowanie,
                2. co warto dopisać,
                3. co jest niejasne,
                4. poprawioną wersję notatki.

                Tytuł: ${note.title}
                Treść: ${note.body}

                Dane zwróć w formacie json.
            `
        })

        return res.status(200).json({
            result: response.output_text
        })
    } catch (error) {
        console.log('AI NOTE ANALYSIS ERROR: ', error)
        return res.status(500).json({ errorCode: 'AI_NOTE_ANALYSIS_ERROR' })
    }
}

module.exports = { 
    getAllNotes, 
    getNote, 
    addNote, 
    updateNote, 
    deleteNote, 
    analyzeNote 
}