const authService = require('../services/authService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: '[FAILED] Username, email and password are required!' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await authService.register(username, email, hashedPassword)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(201).json({ message: `User created`, token })
    } catch (error) {
        res.status(400).json({ message: `[ERROR] Cannot create new user => ${error.message}` })
    }
}

const login = async (req, res) => {
    const { emailOrUsername, password } = req.body

    if(!emailOrUsername || !password) {
        return res.status(400).json({ errorCode: 'MISSING_LOGIN_FIELDS' })
    }

    try {
        const user = await authService.login(emailOrUsername)
        if (!user) {
            return res.status(404).json({ errorCode: 'USER_NOT_FOUND' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ errorCode: 'INVALID_PASSWORD' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({ 
            message: 'Login successful', 
            token, 
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({ message: `[Server error] ${error.message}` })
    }
}

module.exports = { register, login }