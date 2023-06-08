const jwt = require('jsonwebtoken');
const config = require('../config');
const pool = require('../database');

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({ message: 'No token provide' });
      return;
    }
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const result = JSON.parse(
      JSON.stringify(
        await pool.query('SELECT username FROM users WHERE id = ? LIMIT 1', [
          req.userId,
        ])
      )
    );
    const user = result[0].username;

    if (!user) {
      res.status(404).json({ message: 'no user found' });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    const result = JSON.parse(
      JSON.stringify(
        await pool.query('SELECT rol FROM users WHERE id = ? LIMIT 1', [
          req.userId,
        ])
      )
    );
    const { rol } = result[0];

    if (rol !== 1) {
      res.status(403).json({ message: 'require admin role' });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.isUser = async (req, res, next) => {
  try {
    const result = JSON.parse(
      JSON.stringify(
        await pool.query('SELECT rol FROM users WHERE id = ? LIMIT 1', [
          req.userId,
        ])
      )
    );
    const { rol } = result[0];

    if (rol !== 2) {
      res.status(403).json({ message: 'Require User role' });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.isUserOrAdmin = async (req, res, next) => {
  try {
    const result = JSON.parse(
      JSON.stringify(
        await pool.query('SELECT rol FROM users WHERE id = ? LIMIT 1', [
          req.userId,
        ])
      )
    );
    const { rol } = result[0];

    if (rol <= 0) {
      res.status(403).json({ message: 'Require User or admin role' });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};
