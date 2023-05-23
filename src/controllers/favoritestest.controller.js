const pool = require('../database');

module.exports.getFavorite = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT f.id, title, description, image FROM movies as m INNER JOIN favorites as f ON m.id = f.id_movie WHERE id_user = ?',
      [req.userId]
    );
    const favorites = JSON.parse(JSON.stringify(result));

    if (!favorites.length) {
      res.status(404).json({ message: 'Nuevas peliculas favoritas' });
      return;
    }

    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
};

module.exports.addFavorite = async (req, res, next) => {
  try {
    await pool.query(
      'INSERT INTO favorites (id_movie, id_user) VALUES (?, ?);',
      [req.params.id, req.userId]
    );
    res
      .status(200)
      .json({ message: 'the movie was added to favorites success!' });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteFavorite = async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM favorites WHERE id = ? LIMIT 1',
      [req.params.id]
    );

    if (!result.affectedRows) {
      res
        .status(404)
        .json({ message: 'The requested favorites movie was not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'the movie was delete from favorites successfully!' });
  } catch (err) {
    next(err);
  }
};
