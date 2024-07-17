// routes/performance.routes.js
const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performance.controller');

// CRUD routes
router.post('/', performanceController.createPerformance);
router.get('/', performanceController.getPerformances);
router.get('/:id', performanceController.getPerformance);
router.put('/:id', performanceController.updatePerformance);
router.delete('/:id', performanceController.deletePerformance);

// Additional routes
router.get('/:id/cast', performanceController.getPerformanceCast);
router.get('/year/:year', performanceController.getPerformancesByYear);

module.exports = router;