const express = require('express');

const router = express.Router();

const favoritesCtrl = require('../controllers/favorites.controller');
const { verifyToken, isUserOrAdmin } = require('../middlewares/auth.jwt');
const { validateFav } = require('../middlewares/validateFav');

router.get('/', [verifyToken, isUserOrAdmin], favoritesCtrl.getFavorite);
router.post('/:id', [verifyToken, isUserOrAdmin, validateFav], favoritesCtrl.addFavorite);
router.delete('/:id', [verifyToken, isUserOrAdmin], favoritesCtrl.deleteFavorite);

module.exports = router;
