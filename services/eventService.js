const { Event, Note, Subject, User, Class } = require('../models')

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
                model: Class,
                as: 'class',
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

const addEvent = async (title, description, deadline, subjectId, classId, userId) => {
    return await Event.create({ 
        title, 
        description, 
        deadline, 
        subjectId, 
        classId,
        userId 
    })
}

const editEvent = async (id, userId, {title, description, deadline, subjectId, classId, noteIds}) => {
    const event = await Event.findOne({ 
        where: { 
            id, 
            userId,
            isDeleted: false
        } 
    })
    if (!event) return null;

    await event.update({ 
        title, 
        description, 
        deadline, 
        subjectId, 
        classId, 
        userId 
    });

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

module.exports = { getAllEvents, getEvent, addEvent, editEvent, deleteEvent }