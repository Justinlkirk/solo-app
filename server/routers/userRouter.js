const express = require('express'),
  databaseController = require('../controllers/databaseController'),
  router = express.Router();

  router.get('*',
    databaseController.findUserTemp,
    (req, res) => res.status(200).json(res.locals)
  )

  router.post('*',
    databaseController.addUser,
    (req, res) => res.status(200).json(res.locals)
  )

  router.put('*',
    databaseController.updatePreference,
    (req, res) => res.sendStatus(200)
  )

  router.delete('*',
    databaseController.deleteUser,
    (req, res) => res.sendStatus(200)
  )

  module.exports = router;

  // http://localhost:3000/user/?password=1234&sweaterTemp=75&location=Miami, Florida&user_name=Dy

  // CREATE TABLE users (
  //   _id serial PRIMARY KEY,
  //   user_name VARCHAR ( 50 ) UNIQUE NOT NULL,
  //   password VARCHAR ( 50 ) NOT NULL,
  //   sweaterTemp VARCHAR ( 10 ) NOT NULL,
  //   location VARCHAR (50) NOT NULL
  // )