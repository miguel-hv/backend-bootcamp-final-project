const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();



router.post('/register', controller.registerPost);
router.post('/login', controller.loginPost);
router.post('/logout', controller.logoutPost);
router.get('/check-session', controller.checkSession);

module.exports = router;
