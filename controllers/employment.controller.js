// controllers/employment.controller.js
const Employment = require('../models/employment.model');

exports.createEmployment = async (req, res) => {
  try {
    const employment = new Employment(req.body);
    await employment.save();
    res.status(201).json(employment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

exports.deleteEmployment = async (req, res) => {
  try {
    const employment = await Employment.findByIdAndDelete(req.params.id);
    if (!employment) return res.status(404).json({ message: 'Employment not found' });
    res.json({ message: 'Employment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Додаткові методи для отримання зайнятості за актором чи виставою
exports.getEmploymentsByActor = async (req, res) => {
  try {
    const employments = await Employment.find({ actor: req.params.actorId })
      .populate('performance', 'name yearOfProduction');
    res.json(employments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmploymentsByPerformance = async (req, res) => {
  try {
    const employments = await Employment.find({ performance: req.params.performanceId })
      .populate('actor', 'firstName lastName');
    res.json(employments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};