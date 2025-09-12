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
router.patch('/:id', updateSubject)
router.delete('/:id', deleteSubject)

module.exports = router

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Retrieve all subjects
 *     description: Fetches a list of all subjects from the database, including related user.
 *     responses:
 *       200:
 *         description: A list of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Math"
 *                   userId:
 *                     type: integer
 *                     example: 2
 *                   isDeleted:
 *                     type: boolean
 *                     example: false
 *                   user:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: "student123"
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
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Physics"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 isDeleted:
 *                   type: boolean
 *                   example: false
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "studentABC"
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
 *             required:
 *               - name
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Database Design"
 *               userId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Subject created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: "Chemia"
 *                 userId:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Name is required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /subjects/{id}:
 *   patch:
 *     summary: Update an existing subject
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subject to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Biology"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "[INFO] Subject deleted"
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Server error
 */
