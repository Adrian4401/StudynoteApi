const { Note, Subject, User } = require('../models')

const getAllNotes = async (userId) => {
    return await Note.findAll({
        include: [
            {
                model: Subject,
                as: 'subject',
                attributes: ['name']
            }
        ],
        where: { 
            userId, 
            isDeleted: false 
        },
    })
} 

const getNote = async (id, userId) => {
    return await Note.findOne({
        include: [
            {
                model: Subject,
                as: 'subject',
                attributes: ['name']
            }
        ],
        where: {
            id, 
            userId, 
            isDeleted: false
        }
    })
}

const addNote = async (title, body, subjectId, userId) => {
    return await Note.create({ 
        title, 
        body, 
        subjectId, 
        userId 
    })
}

const updateNote = async (id, title, body, subjectId, userId) => {
    return await Note.update(
        { 
            title, 
            body, 
            subjectId 
        },
        { where: { 
            id, 
            userId
        } }
    )
}

const deleteNote = async (id, userId) => {
    return await Note.update(
        { isDeleted: true },
        { where: { 
            id, 
            userId
        } }
    )
}

module.exports = { getAllNotes, getNote, addNote, updateNote, deleteNote }