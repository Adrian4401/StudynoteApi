const express = require('express')
const router = express.Router()

const { 
    getAllClasses,
    getClass,
    addClass,
    updateClass,
    deleteClass 
} = require('../controllers/classController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getAllClasses)
router.get('/:id', authMiddleware, getClass)
router.post('/', authMiddleware, addClass)
router.put('/:id', authMiddleware, updateClass)
router.delete('/:id', authMiddleware, deleteClass)

module.exports = router

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Retrieve all classes
 *     description: Fetches a list of all classes from the database, including related user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of classes
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
 *         description: Server error while fetching classes
 */

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get a single class by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the class to retrieve
 *     responses:
 *       200:
 *         description: A single class
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
 *         description: Class not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Add a new class
 *     security:
 *       - bearerAuth: []
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
 *         description: Class created successfully
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
 * /classes/{id}:
 *   patch:
 *     summary: Update an existing class
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the class to update
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
 *         description: Class edited successfully
 *       400:
 *         description: Name is required
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete a class by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the class to delete
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "[INFO] Class deleted"
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
