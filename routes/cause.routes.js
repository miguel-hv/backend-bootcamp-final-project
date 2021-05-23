const express = require('express');
const controller = require('../controllers/cause.controller');
const router = express.Router();

router.get('/', controller.causesGet);
router.post('/donation', controller.causeDonationPost);

module.exports = router;
