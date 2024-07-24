const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performance.controller');

/**
 * @swagger
 * tags:
 *   name: Performances
 *   description: API for managing theater performances
 */

/**
 * @swagger
 * /api/performances:
 *   post:
 *     summary: Create a new performance
 *     tags: [Performances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PerformanceInput'
 *     responses:
 *       201:
 *         description: Performance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Performance'
 *       400:
 *         description: Invalid request data
 */
router.post('/', performanceController.createPerformance);

/**
 * @swagger
 * /api/performances:
 *   get:
 *     summary: Get all performances
 *     tags: [Performances]
 *     responses:
 *       200:
 *         description: List of performances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Performance'
 */
router.get('/', performanceController.getPerformances);

/**
 * @swagger
 * /api/performances/{id}:
 *   get:
 *     summary: Get a performance by ID
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Performance ID
 *     responses:
 *       200:
 *         description: Performance data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Performance'
 *       404:
 *         description: Performance not found
 */
router.get('/:id', performanceController.getPerformance);

/**
 * @swagger
 * /api/performances/{id}:
 *   put:
 *     summary: Update a performance
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Performance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PerformanceInput'
 *     responses:
 *       200:
 *         description: Performance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Performance'
 *       404:
 *         description: Performance not found
 */
router.put('/:id', performanceController.updatePerformance);

/**
 * @swagger
 * /api/performances/{id}:
 *   delete:
 *     summary: Delete a performance
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Performance ID
 *     responses:
 *       200:
 *         description: Performance deleted successfully
 *       404:
 *         description: Performance not found
 */
router.delete('/:id', performanceController.deletePerformance);

/**
 * @swagger
 * /api/performances/{id}/cast:
 *   get:
 *     summary: Get the cast of a performance
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Performance ID
 *     responses:
 *       200:
 *         description: Cast of the performance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Performance not found
 */
router.get('/:id/cast', performanceController.getPerformanceCast);

/**
 * @swagger
 * /api/performances/year/{year}:
 *   get:
 *     summary: Get performances by year
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of performances
 *     responses:
 *       200:
 *         description: List of performances for the specified year
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Performance'
 */
router.get('/year/:year', performanceController.getPerformancesByYear);

module.exports = router;
