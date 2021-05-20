const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', controller.registerPost);
router.post('/login', controller.loginPost);

module.exports = router;
