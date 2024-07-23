const Performance = require('../models/performance.model');
const Employment = require('../models/employment.model');
const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     PerformanceController:
 *       type: object
 *       properties:
 *         createPerformance:
 *           type: function
 *           description: Creates a new performance with associated employments
 *         getPerformances:
 *           type: function
 *           description: Retrieves all performances
 *         getPerformance:
 *           type: function
 *           description: Retrieves a specific performance by ID
 *         updatePerformance:
 *           type: function
 *           description: Updates an existing performance
 *         deletePerformance:
 *           type: function
 *           description: Deletes a performance and associated employments
 *         getPerformanceCast:
 *           type: function
 *           description: Retrieves the cast of a specific performance
 *         getPerformancesByYear:
 *           type: function
 *           description: Retrieves performances by year of production
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
exports.createPerformance = async (req, res) => {
  console.log("perf", req.body)

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const performanceData = req.body
    const employmentsData = req.body.cast;

    // Create the performance
    const performance = new Performance(performanceData);
    await performance.save({ session });

    // Create employments for the linked actors
    const employments = employmentsData.map(employment => ({
      ...employment,
      performance: performance._id
    }));

    await Employment.insertMany(employments, { session });

    await session.commitTransaction();
    session.endSession();

    // Populate the performance with employments
    const populatedPerformance = await Performance.findById(performance._id).populate('cast');

    res.status(201).json(populatedPerformance);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};

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
 *       500:
 *         description: Server error
 */
exports.getPerformances = async (req, res) => {
  try {
    const performances = await Performance.find()
      .populate({
        path: 'cast',
        populate: {
          path: 'actor',
          model: 'Actor'
        }
      });
    res.json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/performances/{id}:
 *   get:
 *     summary: Get a performance by ID
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Performance details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Performance'
 *       404:
 *         description: Performance not found
 *       500:
 *         description: Server error
 */
exports.getPerformance = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id);
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/performances/{id}:
 *   put:
 *     summary: Update a performance
 *     tags: [Performances]
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
 *       400:
 *         description: Invalid request data
 */
exports.updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    res.json(performance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/performances/{id}:
 *   delete:
 *     summary: Delete a performance
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Performance deleted successfully
 *       404:
 *         description: Performance not found
 *       500:
 *         description: Server error
 */
exports.deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndDelete(req.params.id);
    if (!performance) return res.status(404).json({ message: 'Performance not found' });

    // Delete associated employments
    await Employment.deleteMany({ performance: req.params.id });

    res.json({ message: 'Performance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/performances/{id}/cast:
 *   get:
 *     summary: Get the cast of a performance
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cast of the performance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employment'
 *       500:
 *         description: Server error
 */
exports.getPerformanceCast = async (req, res) => {
  try {
    const cast = await Employment.find({ performance: req.params.id })
      .populate('actor', 'firstName lastName title')
      .select('actor role annualContractValue');
    res.json(cast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/performances/year/{year}:
 *   get:
 *     summary: Get performances by year
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of performances for the specified year
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Performance'
 *       500:
 *         description: Server error
 */
exports.getPerformancesByYear = async (req, res) => {
  try {
    const performances = await Performance.find({ yearOfProduction: req.params.year });
    res.json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
