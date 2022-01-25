const path = require('path'),
  express = require('express'),
  app = express(),
  PORT = 3000,
  databaseController = require('./controllers/databaseController');

app.use(express.json());// Formats req.body
app.use(express.urlencoded({ extended: true }));// Helps parse different data types

app.get('/', 
  databaseController.getUsers,
  (req, res) => {
    console.log(res.locals);
    res.status(200).json(res.locals);
  }
);

app.post('/',
  databaseController.addUser,
  (req, res) => {
    console.log(res.locals);
    res.status(200).json(res.locals);
  }
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const error = {};
  error.log = err.log ? err.log : defaultErr.log;
  error.status = err.status ? err.status : defaultErr.status;
  error.message = err.message ? err.message: defaultErr.message;

  console.log(error.log);
  return res.status(error.status).json(error.message);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on PORT', PORT)
})

module.exports = app;