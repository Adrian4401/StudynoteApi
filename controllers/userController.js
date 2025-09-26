const userService = require('../services/userService')

const getUser = async (req, res) => {
    try {
        const data = await userService.getUser(req.user.id)
        if (!data) return res.status(404).json({ message: `User not found` })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: `[ERROR]: ${error.message}` })
    }
}

const updateUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const updates = {}
        if (username !== undefined) updates.username = username
        if (email !== undefined) updates.email = email
        if (password !== undefined) updates.password = password

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' })
        }

        const [updatedCount] = await userService.updateUser(req.user.id, updates)

        if (updatedCount === 0) return res.status(404).json({ message: `Failed to update account data` })

        res.status(200).json({ message: `User ${username} data updated successfully` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR]: ${error.message}` })
    }
}

const deleteUser = async (req, res) => {
    try {
        const [deletedCount] = await userService.deleteUser(req.user.id)
        if (deletedCount === 0) return res.status(404).json({ message: `Failed to delete account` })
        res.status(200).json({ message: `Account deleted` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR]: ${error.message}` })
    }
}

module.exports = { getUser, updateUser, deleteUser }