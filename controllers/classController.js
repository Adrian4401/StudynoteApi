const classService = require('../services/classService')
 
const getAllClasses = async (req, res) => {
    try {
        const data = await classService.getAllClasses(req.user.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ errorCode: 'CLASSES_ALL_SERVER_ERROR' })
    }
}

const getClass = async (req, res) => {
    const { id } = req.params

    try {
        const data = await classService.getClass(id, req.user.id)
        if (!data) return res.status(404).json({ errorCode: 'MISSING_FIELDS' })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ errorCode: 'CLASS_SERVER_ERROR' })
    }
}

const addClass = async (req, res) => {
    const { name, userId } = req.body

    if (!name || name.trim().length <= 0) return res.status(400).json({ errorCode: 'CLASS_MISSING_FIELDS' })
    
    try {
        const newClass = await classService.addClass(name, req.user.id)
        res.status(201).json(newClass)
    } catch (error) {
        res.status(500).json({ errorCode: 'CLASS_ADD_ERROR' })
    }
}

const updateClass = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if (!name || name.trim().length <= 0) {
        return res.status(400).json({ errorCode: 'MISSING_FIELDS' })
    }

    try {
        const [updatedCount] = await classService.updateClass(id, name.trim(), req.user.id)

        if (updatedCount === 0) {
            return res.status(404).json({ errorCode: 'CLASS_NOT_FOUND' })
        }

        return res.status(200).json({
            id: Number(id),
            name: name.trim()
        })
    } catch (error) {
        return res.status(500).json({ errorCode: 'CLASS_UPDATE_ERROR' })
    }
}

const deleteClass = async (req, res) => {
    const { id } = req.params

    try {
        const [deletedCount] = await classService.deleteClass(id, req.user.id)

        if (deletedCount === 0) return res.status(404).json({ errorCode: 'CLASS_NOT_FOUND' })
            
        res.status(200).json({ message: `[INFO] Class deleted` })
    } catch (error) {
        res.status(500).json({ errorCode: 'CLASS_DELETE_ERROR' })
    }
}

module.exports = { getAllClasses, getClass, addClass, updateClass, deleteClass }