const noteService = require('../services/noteService')
const { generateJson } = require('../services/aiService')
const { noteAnalysisSchema } = require('../schemas/noteSchemas')

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

        if (!data) {
            return res.status(404).json({ errorCode: 'NOTE_NOT_FOUND' })
        }

        res.status(200).json(data)
    } catch (error) {
        console.log('GET NOTE ERROR:', error)
        res.status(500).json({ errorCode: 'NOTE_SERVER_ERROR' })
    }
}

const addNote = async (req, res) => {
    const { title, body, subjectId, classId } = req.body

    if (
        !title ||
        title.trim().length <= 0 ||
        !body ||
        body.trim().length <= 0 ||
        !subjectId ||
        !classId
    ) {
        return res.status(400).json({ errorCode: 'MISSING_FIELDS' })
    }

    try {
        const newNote = await noteService.addNote(
            title.trim(),
            body.trim(),
            subjectId,
            classId,
            req.user.id
        )

        res.status(201).json(newNote)
    } catch (error) {
        console.log('ADD NOTE ERROR:', error)
        res.status(500).json({ errorCode: 'NOTES_ADD_ERROR' })
    }
}

const updateNote = async (req, res) => {
    const { id } = req.params
    const { title, body, subjectId, classId } = req.body

    if (
        !title ||
        title.trim().length <= 0 ||
        !body ||
        body.trim().length <= 0 ||
        !subjectId ||
        !classId
    ) {
        return res.status(400).json({ errorCode: 'MISSING_FIELDS' })
    }

    try {
        const [updatedCount] = await noteService.updateNote(
            id,
            title.trim(),
            body.trim(),
            subjectId,
            classId,
            req.user.id
        )

        if (updatedCount === 0) {
            return res.status(404).json({ errorCode: 'NOTE_NOT_FOUND' })
        }

        res.status(200).json({
            id: Number(id),
            title: title.trim(),
            body: body.trim(),
            subjectId,
            classId
        })
    } catch (error) {
        console.log('UPDATE NOTE ERROR:', error)
        res.status(500).json({ errorCode: 'NOTE_UPDATE_ERROR' })
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ errorCode: 'MISSING_FIELDS' })
    }

    try {
        const [deletedCount] = await noteService.deleteNote(id, req.user.id)

        if (deletedCount === 0) {
            return res.status(404).json({ errorCode: 'NOTE_NOT_FOUND' })
        }

        res.status(200).json({ message: '[INFO] Note deleted' })
    } catch (error) {
        console.log('DELETE NOTE ERROR:', error)
        res.status(500).json({ errorCode: 'NOTE_DELETE_ERROR' })
    }
}

const analyzeNote = async (req, res) => {
    const { id } = req.params

    try {
        const note = await noteService.getNote(id, req.user.id)

        if (!note) {
            return res.status(404).json({ errorCode: 'NOTE_NOT_FOUND' })
        }

        const prompt = `
            Przeanalizuj notatkę studenta i zaproponuj jej usprawnienie.

            Zasady:
            - Nie dodawaj faktów, których nie da się wywnioskować z notatki.
            - Zachowaj sens oryginalnej notatki.
            - Popraw język, strukturę, przejrzystość i kompletność.
            - Jeśli notatka jest chaotyczna, uporządkuj ją w logiczne akapity.
            - Odpowiadaj po polsku.
            - Zwróć wyłącznie poprawny JSON zgodny ze schematem.
            - Nazwy pól muszą być dokładnie takie:
            summary,
            suggestedAdditions,
            unclearParts,
            improvedNote.title,
            improvedNote.body.

            Notatka:
            Tytuł: ${note.title}
            Treść:
            ${note.body}
        `

        const result = await generateJson({
            prompt,
            schemaName: 'note_analysis',
            schema: noteAnalysisSchema
        })

        return res.status(200).json({
            result
        })
    } catch (error) {
        console.log('AI NOTE ANALYSIS ERROR:', error)
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