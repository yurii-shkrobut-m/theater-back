const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the actor
 *         name:
 *           type: string
 *           description: The name of the actor
 *         rank:
 *           type: string
 *           description: The rank of the actor
 *         experience:
 *           type: number
 *           description: Years of experience of the actor
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the actor was added
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the actor was last updated
 *         employments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Employment'
 *           description: List of employments for this actor
 *     
 *     ActorInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the actor
 *         rank:
 *           type: string
 *           description: The rank of the actor
 *         experience:
 *           type: number
 *           description: Years of experience of the actor
 */

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
