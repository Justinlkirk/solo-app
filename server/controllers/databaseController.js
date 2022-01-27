const { Pool } = require('pg');
// const { user } = require('pg/lib/defaults');
const db = require('../models/databaseModel');

const databaseController = {
  getUser: (req, res, next) => {
    const { user_name, password} = req.query,
      queryString = `SELECT users.* FROM users WHERE users.user_name = '${user_name}' AND users.password = '${password}'`;

    db.query(queryString)
      .then(data => {
        res.locals = data.rows[0];
        next()
      }).catch((err) => {
        err.log = 'Error in databaseController.getUsers()';
        next(err);
      })
  },

  addUser: (req, res, next) => {
    const info = req.query, // ?user_name=Me&password=1234&sweaterTemp=11
      queryStringLineOne = 'INSERT INTO users (user_name, password, sweaterTemp, location)',
      queryStringLineTwo = ` VALUES ('${info.user_name}', '${info.password}', '${info.sweaterTemp}', '${info.location}')`,
      queryStringLineThree = ' RETURNING *'
      queryString = queryStringLineOne + queryStringLineTwo + queryStringLineThree;

    db.query(queryString)
      .then(data => {
        res.locals = data.rows;
        next()
      }).catch((err) => {
        err.log = 'Error in databaseController.addUser()';
        next(err);
      })
  },

  findUserTemp: (req, res, next) => {
    const info = req.query,
      queryString = `SELECT users.sweaterTemp, users.location FROM users WHERE users.user_name = '${info.user_name}' AND users.password = '${info.password}'`;

    db.query(queryString)
      .then(data => {
        if (data.rows.length === 0) next({log: 'User does not exist'})
        else {
          res.locals = data.rows[0];
          next()
        }
      }).catch(err => {
        err.log = 'Error in databaseController.findUserTemp()';
        next(err);
      })
  },

  updatePreference: (req, res, next) => {
    const info = req.query,
      queryString = `UPDATE users SET sweatertemp='${info.sweaterTemp}' WHERE user_name='${info.user_name}'`

    db.query(queryString)
      .then(() => next())
      .catch(err => {
        err.log = 'Error in databaseController.updatePreference()';
        next(err);
      })
  },

  deleteUser: (req, res, next) => {
    const info = req.query,
      queryString = `DELETE FROM users WHERE users.user_name = '${info.user_name}' AND users.password = '${info.password}'`;

    db.query(queryString)
      .then(() => next())
      .catch(err => {
        err.log = 'Error in databaseController.deleteUser()';
        next(err);
      })
  },
}

// INSERT INTO users (user_name, password) VALUES ('Weaver', '1234') RETURNING _id

module.exports = databaseController;