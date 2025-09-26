const express = require('express')
const router = express.Router()

const { 
    getAllEvents,
    getEvent,
    createEvent,
    editEvent,
    deleteEvent
} = require('../controllers/eventController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getAllEvents)
router.get('/:id', authMiddleware, getEvent)
router.post('/', authMiddleware, createEvent)
router.patch('/:id', authMiddleware, editEvent)
router.delete('/:id', authMiddleware, deleteEvent)

module.exports = router

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     description: Fetches a list of all events from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of events
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
 *                   description:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                     format: date-time
 *                   subject:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *       500:
 *         description: Server error while fetching events
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a single event by ID with related notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event to retrieve
 *     responses:
 *       200:
 *         description: A single event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 deadline:
 *                   type: string
 *                   format: date-time
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
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       body:
 *                         type: string
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event with a title, description, deadline, subjectId, userId and optional noteIds.
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
 *               - description
 *               - deadline
 *               - subjectId
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Math exam
 *               description:
 *                 type: string
 *                 example: Final exam covering all topics
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-09-20T12:00:00Z
 *               subjectId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 1
 *               noteIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 4]
 *     responses:
 *       201:
 *         description: Event successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 15
 *                 title:
 *                   type: string
 *                   example: Math exam
 *                 description:
 *                   type: string
 *                   example: Final exam covering all topics
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-20T12:00:00Z
 *                 subjectId:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error while creating event
 */

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update an existing event
 *     description: Updates fields of an existing event. Requires the event ID in the path and at least one field to update.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated title
 *               description:
 *                 type: string
 *                 example: Updated description
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-09-21T10:00:00Z
 *               subjectId:
 *                 type: integer
 *                 example: 2
 *               noteIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 3]
 *     responses:
 *       200:
 *         description: Event successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 15
 *                 title:
 *                   type: string
 *                   example: Updated title
 *                 description:
 *                   type: string
 *                   example: Updated description
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-21T10:00:00Z
 *                 subjectId:
 *                   type: integer
 *                   example: 2
 *                 userId:
 *                   type: integer
 *                   example: 7
 *       400:
 *         description: Missing or invalid fields
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error while updating event
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     description: Marks an event as deleted in the database by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event to delete
 *     responses:
 *       200:
 *         description: Event successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "[INFO] Event deleted"
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error while deleting event
 */