var express = require('express');
var router = express.Router();

const Schema = require('../db/schema');

const Households = Schema.HouseholdModel;

//index
router.get('/', (req, res) => {
  Households.find({})
    .then((households) => {
      res.render('households/index', {
        households
      })
    })
});

//create
router.get('/new', (req, res) => {
  res.render('households/new')
})

//show
router.get('/:householdId', (req, res) => {
  const householdId = req.params.householdId;
  Households.findById(householdId)
    .then((household) => {
      res.render('households/show', {
        household
      });
    })
    .catch((err) => {
      console.log(err);
    })
})

//create put
router.post('/', (req, res) => {
  const newHousehold = req.body;
  Households.create({
    name: newHousehold.name,
    members: newHousehold.members.split(', ')
  })
    .then(() => {
      res.redirect('/households');
    })
    .catch((err) => {
      console.log(err);
    })
})

//edit
router.get('/:householdId/edit', (req, res) => {
  let householdId = req.params.householdId;
  Households.findById(householdId)
    .then((household) => {
      res.render('households/edit', {
        household,
        members: household.members.join(', ')
      });
    })
    .catch((err) => {
      console.log(err);
    })
})

//edit put
router.put('/:householdId', (req, res) => {
  const updatedHousehold = req.body;
  const householdId = req.params.householdId;

  console.log(updatedHousehold)

  updatedHousehold.members = updatedHousehold.members.split(', ');

  Households.findOneAndUpdate({ _id: householdId }, updatedHousehold, { new: true })
    .then(() => {
      res.redirect(`/households/${householdId}`);
    })
    .catch((err) => {
      console.log(err)
    })
})

//delete
router.get('/:householdId/delete', (req, res) => {
  const householdId = req.params.householdId;
  Households.findByIdAndRemove(householdId)
    .then((household) => {
      res.redirect('/households/');
    })
    .catch((err) => {
      console.log(err);
    })
})

module.exports = router;
