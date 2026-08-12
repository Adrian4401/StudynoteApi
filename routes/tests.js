const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { 
    generateSubjectTest, 
    checkOpenAnswers,
    getTestHistory,
    getTestResult,
    addTestResult,
    deleteTestResult
} = require('../controllers/testController')

router.post('/subject', authMiddleware, generateSubjectTest)
router.post('/check-open-answers', authMiddleware, checkOpenAnswers)
router.get('/history', authMiddleware, getTestHistory)
router.get('/history/:id', authMiddleware, getTestResult)
router.post('/history', authMiddleware, addTestResult)
router.delete('/history/:id', authMiddleware, deleteTestResult)

module.exports = router