const express = require('express'),
  databaseController = require('../controllers/databaseController'),
  router = express.Router();

// router.get('*',
//   databaseController.getFriendsTemp,
//   (req, res) => {
//     res.set('Access-Control-Allow-Origin', ' * ')
//     res.set('Content-Type', 'application/json')

//     return res.status(200).json(res.locals);
//   }
// )

router.post('*',
  databaseController.addFriend,
  (req, res) => {
    res.set('Access-Control-Allow-Origin', ' * ')
    res.set('Content-Type', 'application/json')

    res.status(200).json({ validity: res.locals.validity })
  }
)

router.get('*',
  databaseController.deleteFriend,
  (req, res) => {
    res.set('Access-Control-Allow-Origin', ' * ')
    res.set('Content-Type', 'application/json')

    res.sendStatus(200)
  }
)

module.exports = router;