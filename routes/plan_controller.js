var express = require('express');
var router = express.Router();

const Schema = require('../db/schema');


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Meal Planner'
  });
});

module.exports = router;
