const express = require('express');

const router = express.Router();

const moviesCtrl = require('../controllers/movies.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.jwt');
const validator = require('../middlewares/validator');

router.get('/', moviesCtrl.getMovies);
router.post('/', [validator.movieValidationRules(), validator.validate, verifyToken, isAdmin], moviesCtrl.addMovie);
router.put('/:id', [validator.movieValidationRules(), validator.validate, verifyToken, isAdmin], moviesCtrl.modifyMovie);

module.exports = router;
