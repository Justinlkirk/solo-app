const axios = require('axios');

const weatherController = {
  access_key: '35376647fc91476088981059cd08614a',

  getCurrentWeather: (req, res, next) => {
    const location = res.locals.self.location,
      url = `http://api.weatherstack.com/current?access_key=${weatherController.access_key}&query=${location}`;
      
    //   res.locals.currentWeather = {  // PLACEHOLDER TO SAVE MONEY
    //   request: {
    //     type: 'City',
    //     query: 'Miami, United States of America',
    //     language: 'en',
    //     unit: 'm'
    //   },
    //   location: {
    //     name: 'Miami',
    //     country: 'United States of America',
    //     region: 'Florida',
    //     lat: '25.774',
    //     lon: '-80.194',
    //     timezone_id: 'America/Kentucky/Monticello',
    //     localtime: '2022-01-27 11:55',
    //     localtime_epoch: 1643284500,
    //     utc_offset: '-5.0'
    //   },
    //   current: {
    //     observation_time: '04:55 PM',
    //     temperature: 22,
    //     weather_code: 122,
    //     weather_icons: [
    //       'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'
    //     ],
    //     weather_descriptions: [ 'Overcast' ],
    //     wind_speed: 7,
    //     wind_degree: 340,
    //     wind_dir: 'NNW',
    //     pressure: 1019,
    //     precip: 0.1,
    //     humidity: 82,
    //     cloudcover: 100,
    //     feelslike: 25,
    //     uv_index: 5,
    //     visibility: 16,
    //     is_day: 'yes'
    //   }
    // } // PLACEHOLDER TO SAVE MONEY
    // next() // DELETE ME
    axios.get(url)
      //.then(data => data.json())
      .then(data => {
        res.locals.currentWeather = data.data;

        next();
      }).catch(err => {
        console.log(err);
        const error = {};
        error.status = err.error.code;
        error.log = err.error.info + ' ' + err.error.type
        next(error);
      })
  },

  // getForecast: (req, res, next) => {
  //   const location = res.locals.location,
  //     url = `http://api.weatherstack.com/forecast?access_key=${weatherController.access_key}&query=${location}&forecast_days=2`;

  //     axios.get(url)
  //     //.then(data => data.json())
  //     .then(data => {
  //       res.locals.forecast = data.data;
  //       next();
  //     }).catch(err => {
  //       console.log(err);
  //       const error = {};
  //       error.status = err.error.code;
  //       error.log = err.error.info + ' ' + err.error.type
  //       next(error);
  //     })
  // },

  determineClothes: (req, res, next) => {
    try {
      res.locals.advice = {};
      const weather = res.locals.currentWeather.current
      temp = weather.feelslike,
      tempInFar = (temp * 1.8) + 32,
      precip = weather.precip,
      umbrellaWeather = precip > 0;

      let sweaterWeather = tempInFar <= res.locals.self.sweatertemp;

      if (sweaterWeather && umbrellaWeather) res.locals.advice.self = 'Wear a sweater and bring an umbrella';
      else if (sweaterWeather) res.locals.advice.self = 'Wear a sweater';
      else if (umbrellaWeather) res.locals.advice.self = 'Bring an umbrella';
      else res.locals.advice.self = 'Do you boo boo';

      // This should really be its own function but I'm tired and keep making mistakes
      const friends = Object.entries(res.locals.friends);
      res.locals.advice.friends = {};
      if (friends.length === 0) return next();

      for (frnd of friends) {
        const prefTemp = frnd[1],
          friend_name = frnd[0];
        sweaterWeather = tempInFar <= prefTemp;

        if (sweaterWeather && umbrellaWeather) res.locals.advice.friends[friend_name] = 'wear a sweater and bring an umbrella';
        else if (sweaterWeather) res.locals.advice.friends[friend_name] = 'wear a sweater';
        else if (umbrellaWeather) res.locals.advice.friends[friend_name] = 'bring an umbrella';
        else res.locals.advice.friends[friend_name] = 'do you boo boo';
      }

      return next()
    } catch {
      return next({ log: 'Error in weatherController.determineClothes()'});
    }
  }
}

module.exports = weatherController;