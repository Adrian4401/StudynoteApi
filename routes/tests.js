const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { generateSubjectTest, checkOpenAnswers } = require('../controllers/testController')

router.post('/subject', authMiddleware, generateSubjectTest)
router.post('/check-open-answers', authMiddleware, checkOpenAnswers)

module.exports = router