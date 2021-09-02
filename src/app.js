const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/login.routes');
const moviesRoutes = require('./routes/movies.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const { handleErrors } = require('./middlewares/handleErrors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/login', loginRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/favorites', favoritesRoutes);

app.use(handleErrors);

module.exports = app;
