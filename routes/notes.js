const express = require('express')
const router = express.Router()

const { 
    getAllNotes, 
    getNote, 
    addNote,
    updateNote,
    deleteNote
} = require('../controllers/noteController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getAllNotes)
router.get('/:id', authMiddleware, getNote)
router.post('/', authMiddleware, addNote)
router.patch('/:id', authMiddleware, updateNote)
router.delete('/:id', authMiddleware, deleteNote)

module.exports = router

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retrieve all notes
 *     description: Fetches all notes from the database with related subject and user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   body:
 *                     type: string
 *                   subject:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *       500:
 *         description: Server error while fetching notes
 */

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the note to retrieve
 *     responses:
 *       200:
 *         description: A single note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 subject:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     description: Creates a new note with title, body, subjectId and userId.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Meeting notes"
 *               body:
 *                 type: string
 *                 example: "Discussed project deadlines and assigned tasks."
 *               subjectId:
 *                 type: integer
 *                 example: 2
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Note successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 subjectId:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *       400:
 *         description: Missing required fields (title or body)
 *       500:
 *         description: Server error while creating note
 */

/**
 * @swagger
 * /notes/{id}:
 *   patch:
 *     summary: Update an existing note
 *     description: Updates fields of an existing note. Requires the note ID in the path.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the note to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated meeting notes"
 *               body:
 *                 type: string
 *                 example: "Updated content of the note"
 *               subjectId:
 *                 type: integer
 *                 example: 3
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Note successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "[INFO] Note updated"
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error while updating note
 */

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     description: Marks a note as deleted in the database by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the note to delete
 *     responses:
 *       200:
 *         description: Note successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "[INFO] Note deleted"
 *       400:
 *         description: Note ID is required
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error while deleting note
 */

