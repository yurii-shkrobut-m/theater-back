const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get('/', async function (req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
