const { Note, Subject, User, Class } = require('../models')

const getAllNotes = async (userId) => {
    const notes = await Note.findAll({
        where: { 
            userId, 
            isDeleted: false 
        },
        attributes: [
            'id',
            'title',
            'subjectId',
            'classId',
            'createdAt'
        ],
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
            }
        ],
        order: [
            [
                'createdAt', 'DESC'
            ]
        ]
    })

    return notes.map(note => ({
        note_id: note.id,
        title: note.title,
        subjectId: note.subjectId,
        subject_name: note.subject?.name,
        classId: note.classId,
        class_name: note.class?.name,
        create_day: note.createdAt
    }))
} 

const getNote = async (id, userId) => {
    const note = await Note.findOne({
        where: {
            id, 
            userId, 
            isDeleted: false
        },
        attributes: [
            'id',
            'title',
            'body',
            'subjectId',
            'classId',
            'createdAt'
        ],
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
            }
        ],
    })

    return {
        note_id: note.id,
        title: note.title,
        body: note.body,
        subjectId: note.subjectId,
        subject_name: note.subject?.name,
        classId: note.classId,
        class_name: note.class?.name,
        create_day: note.createdAt
    }
}

const addNote = async (title, body, subjectId, classId, userId) => {
    return await Note.create({ 
        title, 
        body, 
        subjectId,
        classId, 
        userId 
    })
}

const updateNote = async (id, title, body, subjectId, classId, userId) => {
    return await Note.update(
        { 
            title, 
            body, 
            subjectId,
            classId
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