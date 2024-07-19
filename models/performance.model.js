// models/performance.model.js
const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  budget: {
    type: Number,
    required: true
  }
}, { timestamps: true });

performanceSchema.virtual('cast', {
  ref: 'Employment',
  localField: '_id',
  foreignField: 'performance'
});

performanceSchema.set('toJSON', { virtuals: true });
performanceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Performance', performanceSchema);
