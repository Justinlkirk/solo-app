const axios = require('axios');

const weatherController = {
  getCurrentWeather: (req, res, next) => {
    const access_key = '35376647fc91476088981059cd08614a',
      query = 'Lumberton, Texas',
      url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${query}`;

    console.log('line 7');

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

    console.log('line 23')
  }
}

module.exports = weatherController;