const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword, comparePassword, signToken } = require('../utils/auth');
const authMiddleware = require('../middleware/auth');

// Helper to normalize email
function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

// Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ error: { message: 'username, email, password required', status: 400 } });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: { message: 'Password must be at least 8 characters', status: 400 } });
    }
    const normEmail = normalizeEmail(email);

    const existing = await User.findOne({ $or: [ { email: normEmail }, { username: username.toLowerCase() } ] });
    if (existing) {
      return res.status(409).json({ error: { message: 'User already exists', status: 409 } });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ username: username.toLowerCase(), email: normEmail, passwordHash, role });

    // Decide whether to auto-login on registration; here we return minimal user without token for security clarity
    return res.status(201).json({ user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error('[Register] Error:', err);
    return res.status(500).json({ error: { message: 'Registration failed', status: 500 } });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: { message: 'email and password required', status: 400 } });
    }
    const normEmail = normalizeEmail(email);
    const user = await User.findOne({ email: normEmail });
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid credentials', status: 401 } });
    }
    const match = await comparePassword(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: { message: 'Invalid credentials', status: 401 } });
    }
    const token = signToken(user);
    return res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error('[Login] Error:', err);
    return res.status(500).json({ error: { message: 'Login failed', status: 500 } });
  }
});

// Me (protected)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email role createdAt');
    if (!user) return res.status(404).json({ error: { message: 'User not found', status: 404 } });
    return res.json({ user });
  } catch (err) {
    console.error('[Me] Error:', err);
    return res.status(500).json({ error: { message: 'Failed to fetch user', status: 500 } });
  }
});

module.exports = router;
