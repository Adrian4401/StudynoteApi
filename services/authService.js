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

module.exports = { register, login }