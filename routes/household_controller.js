var express = require('express');
var router = express.Router();

const Schema = require('../db/schema');


/* GET home page. */
router.get('/', (req, res) => {
   res.send('Hi');
  /*res.render('index', {
    title: 'Meal Planner'
  });*/
});

module.exports = router;
