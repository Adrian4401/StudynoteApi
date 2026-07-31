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
            // model: 'gpt-5.6-luna',
            input: `
                You are an assistant helping a student improve their study note.

                Analyze the note and return ONLY valid JSON.
                Do not use markdown.
                Do not wrap the response in json.
                Use exactly this structure:

                {
                "summary": "string",
                "suggestedAdditions": ["string"],
                "unclearParts": ["string"],
                "improvedNote": {
                    "title": "string",
                    "body": "string"
                    }
                }

                Rules:
                - Keep the same language as the original note.
                - Do not invent facts that are not in the note.
                - Improve clarity, grammar, structure and usefulness.
                - If something is missing, mention it in suggestedAdditions.
                - improvedNote.body should be ready to replace the original note body.

                Original title:
                ${note.title}

                Original note:
                ${note.body}
            `
        })

        let result

        try {
            result = JSON.parse(response.output_text)
        } catch (parseError) {
            console.log('AI JSON PARSE ERROR:', parseError)
            return res.status(500).json({ errorCode: 'AI_INVALID_JSON_RESPONSE' })
        }

        return res.status(200).json({ result })
    } catch (error) {
        console.log('AI NOTE ANALYSIS ERROR: ', error)

        if (error.code === 'insufficient_quota') {
            return res.status(429).json({ errorCode: 'AI_INSUFFICIENT_QUOTA' })
        }

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