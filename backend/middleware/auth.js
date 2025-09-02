const { verifyToken } = require('../utils/auth');

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: { message: 'Unauthorized', status: 401 } });
  }
  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.sub, role: decoded.role, username: decoded.username };
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: 'Invalid or expired token', status: 401 } });
  }
}

module.exports = authMiddleware;
