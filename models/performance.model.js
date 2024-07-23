const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Performance:
 *       type: object
 *       required:
 *         - name
 *         - year
 *         - budget
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the performance
 *         name:
 *           type: string
 *           description: The name of the performance
 *         year:
 *           type: number
 *           description: The year the performance was first staged
 *         budget:
 *           type: number
 *           description: The budget of the performance
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the performance was added
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the performance was last updated
 *         cast:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Employment'
 *           description: List of cast members for this performance
 *     
 *     PerformanceInput:
 *       type: object
 *       required:
 *         - name
 *         - year
 *         - budget
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the performance
 *         year:
 *           type: number
 *           description: The year the performance was first staged
 *         budget:
 *           type: number
 *           description: The budget of the performance
 */

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
