const express = require('express')
const router = express.Router()

const { 
    getAllSubjects, 
    getSubject, 
    addSubject, 
    updateSubject,
    deleteSubject 
} = require('../controllers/subjectController')

router.get('/', getAllSubjects)
router.get('/:id', getSubject)
router.post('/', addSubject)
router.patch('/', updateSubject)
router.delete('/:id', deleteSubject)

module.exports = router