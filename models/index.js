const Subject = require('./subject')
const Note = require('./note')
const User = require('./user')
const Event = require('./event')

User.hasMany(Subject, { foreignKey: 'userId', as: 'subjects' })
Subject.belongsTo(User, { foreignKey: 'userId', as: 'user' })

User.hasMany(Note, { foreignKey: 'userId', as: 'notes' })
Note.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Subject.hasMany(Note, { foreignKey: 'subjectId', as: 'notes' })
Note.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' })

Event.belongsToMany(Note, { through: 'EventNotes', foreignKey: 'eventId', otherKey: 'noteId', as: 'notes', timestamps: false })
Note.belongsToMany(Event, { through: 'EventNotes', foreignKey: 'noteId', otherKey: 'eventId', as: 'events', timestamps: false })

module.exports = { Subject, Note, User, Event }