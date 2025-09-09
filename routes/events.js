const express = require('express')
const router = express.Router()

const { 
    getAllEvents,
    getAllEventsWithNotes,
    getEvent,
    createEvent,
    editEvent,
    deleteEvent
} = require('../controllers/eventController')

router.get('/', getAllEvents)
router.get('/with-notes', getAllEventsWithNotes)
router.get('/:id', getEvent)
router.post('/', createEvent)
router.patch('/:id', editEvent)
router.delete('/:id', deleteEvent)

module.exports = router

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     description: Fetches a list of all events from the database.
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
 *                   subjectId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *       500:
 *         description: Server error while fetching events
 */

/**
 * @swagger
 * /events/with-notes:
 *   get:
 *     summary: Retrieve all events with their related notes
 *     description: Fetches a list of all events from the database, including assigned subject, user, and related notes.
 *     responses:
 *       200:
 *         description: A list of events with related notes
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
 *                   subjectId:
 *                     type: integer
 *                   userId:
 *                     type: integer
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
 *                   notes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         title:
 *                           type: string
 *                         body:
 *                           type: string
 *       500:
 *         description: Server error while fetching events with notes
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a single event by ID
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
 *                 subjectId:
 *                   type: integer
 *                 userId:
 *                   type: integer
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
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               subjectId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               noteIds:
 *                 type: array
 *                 items:
 *                   type: integer
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
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                 subjectId:
 *                   type: integer
 *                 userId:
 *                   type: integer
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
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               subjectId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               noteIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Event successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *     description: Deletes an event from the database by its ID.
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
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error while deleting event
 */
