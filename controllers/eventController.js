const { Event, Note, Subject, User } = require('../models')
const eventService = require('../services/eventService')

const getAllEvents = async (req, res) => {
    try {
        const data = await eventService.getAllEvents(req.user.id)
        if (!data || data.length === 0) return res.status(200).json([])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const getEvent = async (req, res) => {
    const { id } = req.params

    try {
        const data = await eventService.getEvent(id, req.user.id)
        if (!data) return res.status(404).json({ message: 'Event not found' })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const createEvent = async (req, res) => {
    const { title, description, deadline, subjectId, noteIds } = req.body

    if (!title || !description || !deadline || !subjectId || !userId) return res.status(400).json({ message: '[FAILED] Title, description, deadline, subjectId and userId are required!' })

    try {
        const newEvent = await eventService.createEvent(title, description, deadline, subjectId, req.user.id)
        if (noteIds && noteIds.length > 0) await newEvent.addNotes(noteIds)
        res.status(201).json(newEvent)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const editEvent = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: '[FAILED] Event ID is required!' })

    try {
        const updateEvent = await eventService.editEvent(id, req.user.id, req.body)
        if (!updateEvent) return res.status(404).json({ message: '[WARN] Event not found' })
        res.status(200).json(updateEvent)
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: '[FAILED] Event ID is required!' })

    try {
        const [deletedCount] = await eventService.deleteEvent(id, req.user.id)
        if (deletedCount === 0) return res.status(404).json({ message: `[WARN] Event not found` })
        res.status(200).json({ message: `[INFO] Event deleted` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR] ${error.message}` })
    }
}

module.exports = { getAllEvents, getEvent, createEvent, editEvent, deleteEvent }