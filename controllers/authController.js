const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: '[FAILED] Username, email and password are required!' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await User.create({ username, email, password: hashedPassword })

        res.status(201).json({ message: `User ${username} created successfully!` })
    } catch (error) 
    {
        res.status(400).json({ message: `[ERROR] Cannot create new user => ${error.message}` })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: '[FAILED] Email and password are required!' })
    }

    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        return res.status(500).json({ message: `[Server error] ${error.message}` })
    }
}

module.exports = { register, login }