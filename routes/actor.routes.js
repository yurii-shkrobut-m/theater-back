const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actor.controller');

/**
 * @swagger
 * tags:
 *   name: Actors
 *   description: API for managing actors
 */

/**
 * @swagger
 * /api/actors:
 *   post:
 *     summary: Create a new actor
 *     tags: [Actors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActorInput'
 *     responses:
 *       201:
 *         description: Actor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Invalid request data
 */
router.post('/', actorController.createActor);

/**
 * @swagger
 * /api/actors:
 *   get:
 *     summary: Get all actors
 *     tags: [Actors]
 *     responses:
 *       200:
 *         description: List of actors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 */
router.get('/', actorController.getActors);

/**
 * @swagger
 * /api/actors/{id}:
 *   get:
 *     summary: Get an actor by ID
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Actor ID
 *     responses:
 *       200:
 *         description: Actor data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Actor not found
 */
router.get('/:id', actorController.getActor);

/**
 * @swagger
 * /api/actors/{id}:
 *   put:
 *     summary: Update an actor
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Actor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActorInput'
 *     responses:
 *       200:
 *         description: Actor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Actor not found
 */
router.put('/:id', actorController.updateActor);

/**
 * @swagger
 * /api/actors/{id}:
 *   delete:
 *     summary: Delete an actor
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Actor ID
 *     responses:
 *       200:
 *         description: Actor deleted successfully
 *       404:
 *         description: Actor not found
 */
router.delete('/:id', actorController.deleteActor);

module.exports = router;
