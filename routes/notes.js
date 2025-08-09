const express = require('express')
const router = express.Router()

const { getAllNotes, getNote, addNote } = require('../controllers/noteController')

router.get('/', getAllNotes)
router.get('/:id', getNote)
router.post('/', addNote)

/** 
* @swagger
* /notes:
*   get:
*     summary: Retrieve all notes
*     description: Fetches a list of notes from an external API (jsonplaceholder.typicode.com).
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
*                   userId:
*                     type: integer
*                     example: 1
*                   id:
*                     type: integer
*                     example: 1
*                   title:
*                     type: string
*                     example: "Sample note title"
*                   body:
*                     type: string
*                     example: "Sample note body"
*       500:
*         description: Server error while fetching notes
*/

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the note to retrieve
 *     responses:
 *       200:
 *         description: A single note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Sample note title"
 *                 body:
 *                   type: string
 *                   example: "Sample note body"
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */


module.exports = router