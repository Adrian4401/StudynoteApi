const { DataTypes } = require("sequelize");
const sequelize = require('../config/database')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    } 
})

module.exports = User