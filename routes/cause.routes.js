const express = require('express');
const controller = require('../controllers/cause.controller');
const router = express.Router();

router.post('/donation', controller.causeDonationPost);

module.exports = router;
