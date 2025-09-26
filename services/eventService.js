const { Event, Note, Subject, User } = require('../models')

const getAllEvents = async (userId) => {
    return await Event.findAll({
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
        where: { 
            userId, 
            isDeleted: false 
        },
    })
}

const getEvent = async (id, userId) => {
    return await Event.findOne({
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
        where: { 
            id, 
            userId, 
            isDeleted: false 
        }
    })
}

const createEvent = async (title, description, deadline, subjectId, userId) => {
    return await Event.create({ 
        title, 
        description, 
        deadline, 
        subjectId, 
        userId 
    })
}

const editEvent = async (id, userId, {title, description, deadline, subjectId, noteIds}) => {
    const event = await Event.findOne({ 
        where: { 
            id, 
            userId
        } 
    })
    if (!event) return null;
    await event.update({ title, description, deadline, subjectId, userId });
    if (Array.isArray(noteIds)) await event.setNotes(noteIds)
    return event;
}

const deleteEvent = async (id, userId) => {
    return await Event.update(
        { isDeleted: true },
        { where: { 
            id, 
            userId 
        } }
    )
}

module.exports = { getAllEvents, getEvent, createEvent, editEvent, deleteEvent }