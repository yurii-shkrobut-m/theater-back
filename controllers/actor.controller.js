const mongoose = require("mongoose");
const Actor = require('../models/actor.model');
const Employment = require('../models/employment.model');

/**
 * @swagger
 * components:
 *   schemas:
 *     ActorController:
 *       type: object
 *       properties:
 *         createActor:
 *           type: function
 *           description: Creates a new actor
 *         getActors:
 *           type: function
 *           description: Retrieves all actors
 *         getActor:
 *           type: function
 *           description: Retrieves a specific actor by ID
 *         updateActor:
 *           type: function
 *           description: Updates an existing actor
 *         deleteActor:
 *           type: function
 *           description: Deletes an actor and associated employments
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
exports.createActor = async (req, res) => {
  console.log("Actor DTO", req.body)
  try {
    const actor = new Actor(req.body);
    await actor.save();
    res.status(201).json(actor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
 *       500:
 *         description: Server error
 */
exports.getActors = async (req, res) => {
  try {
    const actors = await Actor.find()
      .populate({
        path: 'employments',
        populate: {
          path: 'performance',
          model: 'Performance'
        }
      });
    res.json(actors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/actors/{id}:
 *   get:
 *     summary: Get an actor by ID
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actor details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Server error
 */
exports.getActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) return res.status(404).json({ message: 'Actor not found' });
    res.json(actor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/actors/{id}:
 *   put:
 *     summary: Update an actor
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       400:
 *         description: Invalid request data
 */
exports.updateActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actor) return res.status(404).json({ message: 'Actor not found' });
    res.json(actor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/actors/{id}:
 *   delete:
 *     summary: Delete an actor
 *     tags: [Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actor and associated employments deleted successfully
 *       404:
 *         description: Actor not found
 *       400:
 *         description: Error during deletion
 */
exports.deleteActor = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const actorId = req.params.id;

    // Delete the actor
    const actor = await Actor.findByIdAndDelete(actorId, { session });
    if (!actor) {
      throw new Error('Actor not found');
    }

    // Delete employments associated with the actor
    await Employment.deleteMany({ actor: actorId }, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Actor and associated employments deleted successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};
