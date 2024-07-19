
const mongoose = require('mongoose');

const employmentSchema = new mongoose.Schema({
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  },
  performance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Performance',
    required: true
  },
  role: {
    type: String,
    required: true
  },
  annualContractValue: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Employment', employmentSchema);
