const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

const { 
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

router.get('/', authMiddleware, getUser)
router.patch('/', authMiddleware, updateUser)
router.delete('/', authMiddleware, deleteUser)

module.exports = router


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get logged user data
 *     description: Returns user data by ID. Requires authorization token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 isDeleted:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update logged in user data
 *     description: Updates the data of an existing user by ID. Requires authorization token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "new_username"
 *               email:
 *                 type: string
 *                 example: "new_email@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User new_username data updated successfully"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete logged in user
 *     description: Soft deletes a user by setting `isDeleted` to true. Requires authorization token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account deleted"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
