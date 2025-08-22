const express = require('express')
const router = express.Router()

const { register, login } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)

module.exports = router

/**
* @swagger
* /auth/register:
*   post:
*     summary: Create a new user
*     description: Creates a new user in the database with username, email, and password.
*     parameters:
*       - in: query
*         name: username
*         required: true
*         schema:
*           type: string
*         description: Username of the new user
*         example: JohnDoe
*       - in: query
*         name: email
*         required: true
*         schema:
*           type: string
*           format: email
*         description: Email address of the new user
*         example: john.doe@example.com
*       - in: query
*         name: password
*         required: true
*         schema:
*           type: string
*         description: Password for the new user
*         example: SecurePassword123
*     responses:
*       201:
*         description: User successfully created
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
*                   example: JohnDoe
*                 email:
*                   type: string
*                   example: john.doe@example.com
*       400:
*         description: Missing required fields or error creating user
*/

/**
* @swagger
* /auth/login:
*   post:
*     summary: Login a user
*     description: Authenticates a user by email and password.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*               - password
*             properties:
*               email:
*                 type: string
*                 format: email
*                 example: john.doe@example.com
*               password:
*                 type: string
*                 example: SecurePassword123
*     responses:
*       200:
*         description: Login successful
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Login successful"
*                 userId:
*                   type: integer
*                   example: 1
*       400:
*         description: Email or password not provided
*       401:
*         description: Invalid password
*       404:
*         description: User not found
*       500:
*         description: Server error
*/