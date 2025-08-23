const User = require('../models/user')

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
        const deletedCount = await User.update(
            { isDeleted: true },
            { where: { id } }
        )

        if (deletedCount === 0) return res.status(404).json({ message: `Failed to delete account` })

        res.status(200).json({ message: `Account deleted` })
    } catch (error) {
        res.status(500).json({ message: `[ERROR]: ${error.message}` })
    }
}

module.exports = { updateUser, deleteUser }