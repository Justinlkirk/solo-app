const { Pool } = require('pg');
const db = require('../models/databaseModel');

const databaseController = {
  getFriendsTemp: (req, res, next) => {

    const { user_name } = req.query,
      queryString = `SELECT follow_list.friend_name FROM follow_list WHERE follow_list.user_name = '${user_name}'`

    db.query(queryString)
      .then(data => {
        res.locals.friends = {};
        
        if (data.rows.length === 0) return next();
        // if (data.rows.length === 0) res.locals.validity = false;
        // else res.locals.validity = true;
        let queryStringTwo = `SELECT users.user_name, users.sweatertemp FROM users WHERE`
        data.rows.forEach((friend, ind) => {
          if (ind === 0) queryStringTwo += ` user_name='${friend.friend_name}'`
          else queryStringTwo += ` OR user_name='${friend.friend_name}'`
        })
        db.query(queryStringTwo)
          .then(data => {
            data.rows.forEach(user => res.locals.friends[user.user_name] = user.sweatertemp)

            return next()
          }).catch((err) => {
            err.log = 'Error in databaseController.getFriendsTemp() query 2'
          })
      }).catch((err) => {
        err.log = 'Error in databaseController.getFriendsTemp() query 1';
        next(err);
      })
  },

  deleteFriend: (req, res, next) => {
    console.log('In deleteFriend')
    const { user_name, friend_name } = req.query,
      queryString = `DELETE FROM follow_list WHERE user_name='${user_name}' AND friend_name='${friend_name}'`

    db.query(queryString)
      .then(data => {
        // if (data.rows.length === 0) res.locals.validity = false;
        // else res.locals.validity = true;

        return next()
      }).catch((err) => {
        err.log = 'Error in databaseController.deleteFriend()';
        return next(err);
      })
  },

  addFriend: (req, res, next) => {
    const { user_name, friend_name } = req.query,
      queryString = `INSERT INTO follow_list (user_name, friend_name) VALUES ('${user_name}', '${friend_name}')`

    db.query(queryString)
      .then(data => {
        // if (data.rows.length === 0) res.locals.validity = false;
        // else res.locals.validity = true;

        return next()
      }).catch((err) => {
        err.log = 'Error in databaseController.getUsers()';
        return next(err);
      })
  },

  getUser: (req, res, next) => {
    const { user_name, password } = req.query,
      queryString = `SELECT users.* FROM users WHERE users.user_name = '${user_name}'`;

    db.query(queryString)
      .then(data => {
        if (data.rows.length === 0 || data.rows[0].password !== password) res.locals.validity = false;
        else res.locals.validity = true;

        return next()
      }).catch((err) => {
        err.log = 'Error in databaseController.getUsers()';
        return next(err);
      })
  },

  addUser: (req, res, next) => {
    const info = req.query, // ?user_name=Me&password=1234&sweaterTemp=11
      queryStringLineOne = 'INSERT INTO users (user_name, password, sweatertemp, location)',
      queryStringLineTwo = ` VALUES ('${info.user_name}', '${info.password}', '${info.sweatertemp}', '${info.location}')`,
      queryStringLineThree = ' RETURNING *'
      queryString = queryStringLineOne + queryStringLineTwo + queryStringLineThree;

    db.query(queryString)
      .then(data => {
        if (data.rows.length === 0) res.locals.validity = false;
        else res.locals.validity = true;

        return next()
      }).catch((err) => {
        err.log = 'Error in databaseController.addUser()';
        return next(err);
      })
  },

  findUserTemp: (req, res, next) => {
    const info = req.query,
      queryString = `SELECT users.sweaterTemp, users.location FROM users WHERE users.user_name = '${info.user_name}'`;

    db.query(queryString)
      .then(data => {
        if (data.rows.length === 0) next({log: 'User does not exist in findUserTemp'})
        else {
          res.locals.self = data.rows[0];
          return next()
        }
      }).catch(err => {
        err.log = 'Error in databaseController.findUserTemp()';
        return next(err);
      })
  },

  updatePreference: (req, res, next) => {
    const info = req.query,
      queryString = `UPDATE users SET sweatertemp='${info.sweaterTemp}' WHERE user_name='${info.user_name}'`

    db.query(queryString)
      .then(() => next())
      .catch(err => {
        err.log = 'Error in databaseController.updatePreference()';
        return next(err);
      })
  },

  deleteUser: (req, res, next) => {
    const info = req.query,
      queryString = `DELETE FROM users WHERE users.user_name = '${info.user_name}'`;

    db.query(queryString)
      .then(() => next())
      .catch(err => {
        err.log = 'Error in databaseController.deleteUser()';
        return next(err);
      })
  },
}

// INSERT INTO users (user_name, password) VALUES ('Weaver', '1234') RETURNING _id

module.exports = databaseController;