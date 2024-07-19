
const mongoose = require("mongoose");

const Actor = require('../models/actor.model');
const Employment = require('../models/employment.model');

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

exports.getActors = async (req, res) => {
  try {
    const actors = await Actor.find()
      .populate({
        path: 'employments',
        populate: {
          path: 'performance',
          model: 'Performance'
        }
      });;
    res.json(actors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) return res.status(404).json({ message: 'Actor not found' });
    res.json(actor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actor) return res.status(404).json({ message: 'Actor not found' });
    res.json(actor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

