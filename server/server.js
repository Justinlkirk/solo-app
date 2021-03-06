const path = require('path'),
  express = require('express'),
  app = express(),
  PORT = 3000,
  userRouter = require('./routers/userRouter'),
  weatherRouter = require('./routers/weatherRouter'),
  friendsRouter = require('./routers/friendsRouter');

app.use(express.json());// Formats req.body
app.use(express.urlencoded({ extended: true }));// Helps parse different data types

app.use('/user/friend*', friendsRouter)
app.use('/user*', userRouter);
app.use('/weather', weatherRouter);

app.use((req, res) => res.sendStatus(404));

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