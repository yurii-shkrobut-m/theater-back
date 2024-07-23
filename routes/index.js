const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home page of the application
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Display the home page
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Home page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
