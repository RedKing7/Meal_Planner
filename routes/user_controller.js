var express = require('express');
var router = express.Router();

const Schema = require('../db/schema');

const Users = Schema.UserModel;

// index
router.get('/', (req, res) => {
   Users.find({})
      .then((users) => {
         res.render('users/index', {
            users
         })
      })
});


//delete
router.get('/:userId/delete', (req, res) => {
   const userId = req.params.userId;
   Users.findByIdAndRemove(userId)
      .then((user) => {
         res.redirect('/users/');
      })
      .catch((err) => {
         console.log(err);
      })
})

module.exports = router;
