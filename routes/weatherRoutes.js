const { readWeather } = require('../controllers/weatherController')

const router = require('express').Router()

router.get('/weather', readWeather);

module.exports = router