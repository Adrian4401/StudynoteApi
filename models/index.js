const Subject = require('./subject')
const Note = require('./note')
const User = require('./user')

User.hasMany(Subject, { foreignKey: 'userId', as: 'subjects' })
Subject.belongsTo(User, { foreignKey: 'userId', as: 'user' })

User.hasMany(Note, { foreignKey: 'userId', as: 'notes' })
Note.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Subject.hasMany(Note, { foreignKey: 'subjectId', as: 'notes' })
Note.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' })

module.exports = { Subject, Note, User }