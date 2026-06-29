const subjectService = require('../services/subjectService')
 
const getAllSubjects = async (req, res) => {
    try {
        const data = await subjectService.getAllSubjects(req.user.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ errorCode: 'SUBJECTS_ALL_SERVER_ERROR' })
    }
}

const getSubject = async (req, res) => {
    const { id } = req.params

    try {
        const data = await subjectService.getSubject(id, req.user.id)
        if (!data) return res.status(404).json({ errorCode: 'MISSING_FIELDS' })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ errorCode: 'SUBJECT_SERVER_ERROR' })
    }
}

const addSubject = async (req, res) => {
    const { name, userId } = req.body

    if (!name || name.length <= 0) return res.status(400).json({ errorCode: 'SUBJECT_MISSING_FIELDS' })
    
    try {
        const newSubject = await subjectService.addSubject(name, req.user.id)
        res.status(201).json(newSubject)
    } catch (error) {
        res.status(500).json({ errorCode: 'SUBJECT_ADD_ERROR' })
    }
}

const updateSubject = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if (!name || name.trim().length <= 0) {
        return res.status(400).json({ errorCode: 'MISSING_FIELDS' })
    }

    try {
        const [updatedCount] = await subjectService.updateSubject(id, name.trim(), req.user.id)

        if (updatedCount === 0) {
            return res.status(404).json({ errorCode: 'SUBJECT_NOT_FOUND' })
        }

        return res.status(200).json({
            id: Number(id),
            name: name.trim()
        })
    } catch (error) {
        return res.status(500).json({ errorCode: 'SUBJECT_UPDATE_ERROR' })
    }
}

const deleteSubject = async (req, res) => {
    const { id } = req.params

    try {
        const [deletedCount] = await subjectService.deleteSubject(id, req.user.id)

        if (deletedCount === 0) return res.status(404).json({ errorCode: 'SUBJECT_NOT_FOUND' })
            
        res.status(200).json({ message: `[INFO] Subject deleted` })
    } catch (error) {
        res.status(500).json({ errorCode: 'SUBJECT_DELETE_ERROR' })
    }
}

module.exports = { getAllSubjects, getSubject, addSubject, updateSubject, deleteSubject }