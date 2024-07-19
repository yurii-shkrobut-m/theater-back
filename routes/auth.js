const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config()

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.status(201).json({ ok: true, user: { _id: user._id, username: user.username, email: user.email, role: user.role, token } });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.json({ ok: true, user: { _id: user._id, username: user.username, email: user.email, role: user.role, token } });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;
