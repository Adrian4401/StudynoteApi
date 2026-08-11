const User = require('../models/user')
const { Op } = require('sequelize')

const register = async (username, email, hashedPassword) => {
    return await User.create({ 
        username, 
        email, 
        password: hashedPassword 
    })
}

const login = async (emailOrUsername) => {
    return await User.findOne({ 
        where: { 
            [Op.or]: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        } 
    })
}

const getUserById = async (id) => {
    return await User.findOne({
        where: { id }
    })
}

const changePassword = async (id, password) => {
    return await User.update(
        { password },
        { where: { id } }
    )
}

module.exports = { register, login, getUserById, changePassword }