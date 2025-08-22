const Subject = require('./subject')
const Note = require('./note')

Subject.hasMany(Note, { foreignKey: 'subjectId', as: 'notes' })
Note.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' })

module.exports = { Subject, Note }