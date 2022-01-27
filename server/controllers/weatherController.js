const axios = require('axios');

const weatherController = {
  access_key: '35376647fc91476088981059cd08614a',

  getCurrentWeather: (req, res, next) => {
    const location = res.locals.location,
      url = `http://api.weatherstack.com/current?access_key=${weatherController.access_key}&query=${location}`;

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
    console.log(res.locals.currentWeather.current, res.locals.sweatertemp)
    //try {
      const weather = res.locals.currentWeather.current
      temp = weather.feelslike,
      tempInFar = (temp * 1.8) + 32,
      precip = weather.precip,
      sweaterWeather = tempInFar <= res.locals.sweatertemp,
      umbrellaWeather = precip > 0;
      if (res.locals.location === 'Miami, Florida') umbrellaWeather = true;

      if (sweaterWeather && umbrellaWeather) res.locals.advice = 'Wear a sweater and bring an umbrella';
      else if (sweaterWeather) res.locals.advice = 'Wear a sweater';
      else if (umbrellaWeather) res.locals.advice = 'Bring an umbrella';
      else res.locals.advice = 'Do you boo boo';
      console.log(res.locals.advice)
      next()
    // } catch {
    //   next({ log: 'Error in weatherController.determineClothes()'});
    // }
  }
}

module.exports = weatherController;