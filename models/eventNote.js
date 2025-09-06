const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const EventNote = sequelize.define('EventNotes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Events',
            key: 'id'
        }
    },
    noteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Notes',
            key: 'id'
        }
    }
}, { timestamps: false })

module.exports = EventNote