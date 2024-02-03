const express = require('express');
const router = express.Router();

const weatherCtrl = require('../controllers/weather');

router.post('/recherche', weatherCtrl.getWeather);
router.post('/timezone', weatherCtrl.timezone);

module.exports = router;