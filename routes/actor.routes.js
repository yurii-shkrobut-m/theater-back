// routes/actor.routes.js
const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actor.controller');

router.post('/', actorController.createActor);
router.get('/', actorController.getActors);
router.get('/:id', actorController.getActor);
router.put('/:id', actorController.updateActor);
router.delete('/:id', actorController.deleteActor);

module.exports = router;
