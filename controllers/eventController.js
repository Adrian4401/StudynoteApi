const { Event, Note, Subject, User } = require('../models')

const getAllEvents = async (req, res) => {
    try {
        const data = await Event.findAll({
            include: [
                {
                    model: Subject,
                    as: 'subject',
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username']
                },
            ],
            where: { isDeleted: false },
            })

        if (!data || data.length === 0) return res.status(200).json([])

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const getAllEventsWithNotes = async (req, res) => {
    try {
        const data = await Event.findAll({
            include: [
                {
                    model: Subject,
                    as: 'subject',
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username']
                },
                {
                    model: Note,
                    as: 'notes',
                    attributes: ['id', 'title', 'body'],
                    through: { attributes: [] }
                }
            ],
            where: { isDeleted: false },
            })

        if (!data || data.length === 0) return res.status(200).json([])

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const getEvent = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Event.findOne({
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
                },
                {
                    model: Note,
                    as: 'notes',
                    attributes: ['id', 'title', 'body'],
                    through: { attributes: [] }
                }
            ],
            where: { id, isDeleted: false }
        })

        if (!data) return res.status(404).json({ message: 'Event not found' })
            
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const createEvent = async (req, res) => {
    const { title, description, deadline, subjectId, userId, noteIds } = req.body

    if (!title || !description || !deadline || !subjectId || !userId) return res.status(400).json({ message: '[FAILED] Title, description, deadline, subjectId and userId are required!' })

    try {
        const newEvent = await Event.create({ title, description, deadline, subjectId, userId })

        if (noteIds && noteIds.length > 0) {
            await newEvent.addNotes(noteIds)
        }

        res.status(201).json(newEvent)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const editEvent = async (req, res) => {
    const { id } = req.params
    const { title, description, deadline, subjectId, userId, noteIds } = req.body

    if (!id) return res.status(400).json({ message: '[FAILED] Event ID is required!' })

    try {
        const event = await Event.findOne({ where: { id } })

        if (!event) return res.status(404).json({ message: '[WARN] Event not found' })

        await event.update({ title, description, deadline, subjectId, userId })

        if (Array.isArray(noteIds)) {
            await event.setNotes(noteIds)
        }

        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: '[FAILED] Event ID is required!' })

    try {
        const [deletedCount] = await Event.update(
            { isDeleted: true },
            { where: { id } }
        )

        if (deletedCount === 0) return res.status(404).json({ message: `[WARN] Event not found` })

        res.status(200).json({ message: `[INFO] Event deleted` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

module.exports = { getAllEvents, getAllEventsWithNotes, getEvent, createEvent, editEvent, deleteEvent }