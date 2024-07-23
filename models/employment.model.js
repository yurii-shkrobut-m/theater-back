const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Employment:
 *       type: object
 *       required:
 *         - actor
 *         - performance
 *         - role
 *         - annualContractValue
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the employment
 *         actor:
 *           type: string
 *           description: The id of the actor
 *         performance:
 *           type: string
 *           description: The id of the performance
 *         role:
 *           type: string
 *           description: The role of the actor in the performance
 *         annualContractValue:
 *           type: number
 *           description: The annual contract value for this role
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the employment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the employment was last updated
 *     
 *     EmploymentInput:
 *       type: object
 *       required:
 *         - actor
 *         - performance
 *         - role
 *         - annualContractValue
 *       properties:
 *         actor:
 *           type: string
 *           description: The id of the actor
 *         performance:
 *           type: string
 *           description: The id of the performance
 *         role:
 *           type: string
 *           description: The role of the actor in the performance
 *         annualContractValue:
 *           type: number
 *           description: The annual contract value for this role
 */

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
