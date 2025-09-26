const User = require('../models/user')

const register = async (username, email, hashedPassword) => {
    return await User.create({ 
        username, 
        email, 
        password: hashedPassword 
    })
}

const login = async (email) => {
    return await User.findOne({ where: { email } })
}

module.exports = { register, login }