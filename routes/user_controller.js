var express = require('express');
var router = express.Router();

const Schema = require('../db/schema');

const Users = Schema.UserModel;

/* GET home page. */
router.get('/', (req, res) => {
   Users.find({})
      .then((users) => {
         res.render('users/index', {
            users
         })
      })
});

module.exports = router;
