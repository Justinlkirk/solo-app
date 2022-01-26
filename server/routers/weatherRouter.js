const express = require('express'),
  databaseController = require('../controllers/databaseController'),
  weatherController = require('../controllers/weatherController'),
  router = express.Router();

  router.get('*',
    databaseController.findUserTemp,
    weatherController.getCurrentWeather,
    // weatherController.getForecast, Free tier doesn't support
    weatherController.determineClothes,
    (req, res) => res.status(200).json(res.locals.advice)
  )

  // http://localhost:3000/weather/?user_name=Grandma&password=1234

  module.exports = router;