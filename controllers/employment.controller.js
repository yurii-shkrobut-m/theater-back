const Employment = require('../models/employment.model');

/**
 * @swagger
 * components:
 *   schemas:
 *     EmploymentController:
 *       type: object
 *       properties:
 *         createEmployment:
 *           type: function
 *           description: Creates a new employment
 *         getEmployments:
 *           type: function
 *           description: Retrieves all employments
 *         getEmployment:
 *           type: function
 *           description: Retrieves a specific employment by ID
 *         updateEmployment:
 *           type: function
 *           description: Updates an existing employment
 *         deleteEmployment:
 *           type: function
 *           description: Deletes an employment
 *         getEmploymentsByActor:
 *           type: function
 *           description: Retrieves employments for a specific actor
 *         getEmploymentsByPerformance:
 *           type: function
 *           description: Retrieves employments for a specific performance
 */

/**
 * @swagger
 * /api/employments:
 *   post:
 *     summary: Create a new employment
 *     tags: [Employments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmploymentInput'
 *     responses:
 *       201:
 *         description: Employment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employment'
 *       400:
 *         description: Invalid request data
 */
exports.createEmployment = async (req, res) => {
  try {
    const employment = new Employment(req.body);
    await employment.save();
    res.status(201).json(employment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/employments:
 *   get:
 *     summary: Get all employments
 *     tags: [Employments]
 *     responses:
 *       200:
 *         description: List of employments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employment'
 *       500:
 *         description: Server error
 */
exports.getEmployments = async (req, res) => {
  try {
    const employments = await Employment.find()
      .populate('actor', 'firstName lastName')
      .populate('performance', 'name yearOfProduction');
    res.json(employments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/employments/{id}:
 *   get:
 *     summary: Get an employment by ID
 *     tags: [Employments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employment'
 *       404:
 *         description: Employment not found
 *       500:
 *         description: Server error
 */
exports.getEmployment = async (req, res) => {
  try {
    const employment = await Employment.findById(req.params.id)
      .populate('actor', 'firstName lastName')
      .populate('performance', 'name yearOfProduction');
    if (!employment) return res.status(404).json({ message: 'Employment not found' });
    res.json(employment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/employments/{id}:
 *   put:
 *     summary: Update an employment
 *     tags: [Employments]
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
 *             $ref: '#/components/schemas/EmploymentInput'
 *     responses:
 *       200:
 *         description: Employment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employment'
 *       404:
 *         description: Employment not found
 *       400:
 *         description: Invalid request data
 */
exports.updateEmployment = async (req, res) => {
  try {
    const employment = await Employment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('actor', 'firstName lastName')
      .populate('performance', 'name yearOfProduction');
    if (!employment) return res.status(404).json({ message: 'Employment not found' });
    res.json(employment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/employments/{id}:
 *   delete:
 *     summary: Delete an employment
 *     tags: [Employments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employment deleted successfully
 *       404:
 *         description: Employment not found
 *       500:
 *         description: Server error
 */
exports.deleteEmployment = async (req, res) => {
  try {
    const employment = await Employment.findByIdAndDelete(req.params.id);
    if (!employment) return res.status(404).json({ message: 'Employment not found' });
    res.json({ message: 'Employment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/employments/actor/{actorId}:
 *   get:
 *     summary: Get employments by actor
 *     tags: [Employments]
 *     parameters:
 *       - in: path
 *         name: actorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employments for the actor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employment'
 *       500:
 *         description: Server error
 */
exports.getEmploymentsByActor = async (req, res) => {
  try {
    const employments = await Employment.find({ actor: req.params.actorId })
      .populate('performance', 'name yearOfProduction');
    res.json(employments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/employments/performance/{performanceId}:
 *   get:
 *     summary: Get employments by performance
 *     tags: [Employments]
 *     parameters:
 *       - in: path
 *         name: performanceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employments for the performance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employment'
 *       500:
 *         description: Server error
 */
exports.getEmploymentsByPerformance = async (req, res) => {
  try {
    const employments = await Employment.find({ performance: req.params.performanceId })
      .populate('actor', 'firstName lastName');
    res.json(employments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
