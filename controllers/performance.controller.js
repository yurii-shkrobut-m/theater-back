// controllers/performance.controller.js
const Performance = require('../models/performance.model');
const Employment = require('../models/employment.model');
const mongoose = require("mongoose");

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

exports.getPerformance = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id);
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    res.json(performance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

exports.getPerformancesByYear = async (req, res) => {
  try {
    const performances = await Performance.find({ yearOfProduction: req.params.year });
    res.json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};