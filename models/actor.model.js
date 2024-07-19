
const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String },
  experience: { type: Number, default: 0 }
}, { timestamps: true });

actorSchema.virtual('employments', {
  ref: 'Employment',
  localField: '_id',
  foreignField: 'actor'
});

actorSchema.set('toJSON', { virtuals: true });
actorSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Actor', actorSchema);
