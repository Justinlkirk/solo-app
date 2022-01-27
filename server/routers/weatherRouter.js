const express = require('express'),
  databaseController = require('../controllers/databaseController'),
  weatherController = require('../controllers/weatherController'),
  router = express.Router();

  router.get('*',
    databaseController.findUserTemp,// res.locals.self = {sweatertemp: 100, location: Lumberton Texas}
    weatherController.getCurrentWeather,// res.locals.currentWeather = {}
    databaseController.getFriendsTemp,// res.locals.friends = {'Grandma': '100'...}
    // weatherController.getForecast, Free tier doesn't support
    weatherController.determineClothes,// res.locals.advice {self: advice, friends: {friend_name: advice, friend_name: advice....}}
    (req, res) => {
      res.set('Access-Control-Allow-Origin', ' * ')
      res.set('Content-Type', 'application/json')

      res.status(200).json(res.locals.advice)
    }
  )

  // http://localhost:3000/weather/?user_name=Grandma&password=1234

  module.exports = router;