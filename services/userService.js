const User = require('../models/user')

const getUser = async (userId) => {
    return await User.findOne({
        where: { 
            id: userId, 
            isDeleted: false 
        }
    })
}

const updateUser = async (userId, updates) => {
    return await User.update(
        updates,
        { where: { id: userId } }
    )
}

const deleteUser = async (userId) => {
    return await User.update(
        { isDeleted: true },
        { where: { id: userId } }
    )
}

module.exports = { getUser, updateUser, deleteUser }