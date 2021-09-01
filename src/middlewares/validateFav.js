const pool = require('../database');

module.exports.validateFav = async (req, res, next) => {
  try {
    const result = JSON.parse(JSON.stringify(await pool.query('SELECT COUNT(*) as count FROM favorites WHERE id_movie = ? and id_user = ?', [req.params.id, req.userId])));
    const { count } = result[0];

    if (count) {
      res.status(500).json({ message: 'the movie is already favorites' });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};
