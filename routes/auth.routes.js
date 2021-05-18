const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();

router.get('/login', controller.loginGet);
router.post('/login', controller.loginPost);

router.get('/register', controller.registerGet);
router.post('/register', controller.registerPost);

router.get('/register-artist', controller.registerGet);
router.post('/register-artist', controller.registerArtistPost);

router.post('/logout', controller.logoutPost);



module.exports = router;