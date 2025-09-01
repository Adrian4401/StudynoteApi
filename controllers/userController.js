const User = require('../models/user')

const getAllUsers = async (req, res) => {
    try {
        const data = await User.findAll({
            where: { isDeleted: false }
        })

        if (!data || data.length === 0) return res.status(200).json([])

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[Error]: ${error.message}` })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const data = await User.findOne({
            where: { id, isDeleted: false }
        })

        if (!data) return res.status(404).json({ message: `User not found` })

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR]: ${error.message}` })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { username, email, password } = req.body

    try {
        const [updatedCount] = await User.update(
            { username, email, password },
            { where: { id } }
        )

        if (updatedCount === 0) return res.status(404).json({ message: `Failed to update account data` })

        res.status(200).json({ message: `User ${username} data updated successfully` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR]: ${error.message}` })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const [deletedCount] = await User.update(
            { isDeleted: true },
            { where: { id } }
        )

        if (deletedCount === 0) return res.status(404).json({ message: `Failed to delete account` })

        res.status(200).json({ message: `Account deleted` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR]: ${error.message}` })
    }
}

module.exports = { getAllUsers, getUser, updateUser, deleteUser }