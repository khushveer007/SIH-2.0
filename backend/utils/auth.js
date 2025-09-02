const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

async function hashPassword(plain) {
  if (!plain) throw new Error('Password required');
  return bcrypt.hash(plain, SALT_ROUNDS);
}

async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function signToken(user) {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error('AUTH_JWT_SECRET not set');
  const expiresIn = process.env.AUTH_JWT_EXPIRES || '1h';
  return jwt.sign({
    sub: user._id.toString(),
    role: user.role,
    username: user.username
  }, secret, { expiresIn });
}

function verifyToken(token) {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error('AUTH_JWT_SECRET not set');
  return jwt.verify(token, secret);
}

module.exports = { hashPassword, comparePassword, signToken, verifyToken };
