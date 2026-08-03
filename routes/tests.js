const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { generateSubjectTest } = require('../controllers/testController')

router.post('/subject', authMiddleware, generateSubjectTest)

module.exports = router