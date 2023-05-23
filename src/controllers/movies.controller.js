const pool = require('../database');

module.exports.getMovies = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, title, description, image FROM movies'
    );

    if (!result.length) {
      res.status(404).json({ message: 'No Movies found' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports.addMovie = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;

    await pool.query(
      'INSERT INTO movies (title, description, image) VALUES (?, ?, ?)',
      [title, description, image]
    );
    res.status(200).json({ message: 'the movie was added successfully!' });
  } catch (err) {
    next(err);
  }
};

module.exports.modifyMovie = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;
    const result = await pool.query(
      'UPDATE movies SET title = ?, description = ?, image = ? WHERE id = ? LIMIT 1',
      [title, description, image, req.params.id]
    );

    if (!result.affectedRows) {
      res.status(404).json({ message: 'The requested movie was not found' });
      return;
    }

    res.status(200).json({ message: 'the movie was added successfully!' });
  } catch (err) {
    next(err);
  }
};
