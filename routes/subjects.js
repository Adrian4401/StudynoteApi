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

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Retrieve all subjects
 *     description: Fetches a list of all subjects from the database.
 *     responses:
 *       200:
 *         description: A list of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Server error while fetching subjects
 */

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     summary: Get a single subject by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subject to retrieve
 *     responses:
 *       200:
 *         description: A single subject
 *         content:
 *           application/json:
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Add a new subject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Physics"
 *     responses:
 *       201:
 *         description: Subject created successfully
 *         content:
 *           application/json
 *       400:
 *         description: Name is required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /subjects:
 *   patch:
 *     summary: Update an existing subject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Advanced Mathematics"
 *     responses:
 *       200:
 *         description: Subject edited successfully
 *       400:
 *         description: Name is required
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     summary: Delete a subject by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subject to delete
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Server error
 */