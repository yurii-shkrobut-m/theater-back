const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET users listing
router.get('/', async function (req, res, next) {
  try {
    const users = await User.find(); // Отримуємо список користувачів з бази даних
    res.json(users); // Відправляємо список користувачів у форматі JSON
  } catch (err) {
    next(err); // Передаємо помилку у middleware обробки помилок
  }
});

module.exports = router;
