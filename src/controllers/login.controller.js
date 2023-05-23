const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database');
const config = require('../config');

module.exports.login = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, rol, password FROM users WHERE email = ?',
      [req.body.email]
    );
    const user = JSON.parse(JSON.stringify(result));

    if (!user.length) {
      res.status(400).json({ message: 'User not found test' });
      return;
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );

    if (!matchPassword) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign(
      { id: user[0].id, rol: user[0].rol },
      config.SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
