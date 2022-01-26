const { Pool } = require('pg');
// const { user } = require('pg/lib/defaults');
const db = require('../models/databaseModel');

const databaseController = {
  getUsers: (req, res, next) => {
    const queryString = 'SELECT users.* FROM users'

    db.query(queryString)
      .then(data => {
        res.locals.users = data.rows;
        next()
      }).catch((err) => {
        err.log = 'Error in databaseController.getUsers()';
        next(err);
      })
  },

  addUser: (req, res, next) => {
    const info = {user_name: 'Kirk', password: '1234'} //req.body
      queryStringLineOne = 'INSERT INTO users (user_name, password)',
      queryStringLineTwo = ` VALUES ('${info.user_name}', '${info.password}')`,
      queryStringLineThree = ' RETURNING _id'
      queryString = queryStringLineOne + queryStringLineTwo + queryStringLineThree;
    console.log(queryString)

    db.query(queryString)
      .then(data => {
        res.locals._id = data.rows;
        next()
      }).catch((err) => {
        err.log = 'Error in databaseController.addUser()';
        next(err);
      })
  }
}

// INSERT INTO users (user_name, password) VALUES ('Weaver', '1234') RETURNING _id

module.exports = databaseController;