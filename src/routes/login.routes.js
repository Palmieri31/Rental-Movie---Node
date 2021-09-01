const express = require('express');

const router = express.Router();

const validator = require('../middlewares/validator');
const loginCtrl = require('../controllers/login.controller');

router.post('/', [validator.userValidationRules(), validator.validate], loginCtrl.login);

module.exports = router;
