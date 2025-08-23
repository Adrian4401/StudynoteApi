const express = require('express')
const router = express.Router()

const { 
    updateUser,
    deleteUser
} = require('../controllers/userController')

router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user data
 *     description: Updates the data of an existing user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
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
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Soft deletes a user by setting `isDeleted` to true.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
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
