var express = require('express');
var router = express.Router();

const Schema = require('../db/schema');

const Households= Schema.HouseholdModel;

//index
router.get('/', (req, res) => {
  Households.find({})
    .then((households)=>{
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
  const householdId= req.params.householdId;
  Households.findById(householdId)
     .then((user) => {
        res.render('households/show', {
           user
        });
     })
     .catch((err) => {
        console.log(err);
     })
})

//create put
router.post('/', (req, res) => {
  const newUser = req.body;
  Households.create({
     username: newUser.username,
     name: newUser.name
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
  let householdId= req.params.householdId;
  Households.findById(householdId)
     .then((user) => {
        res.render('households/edit', {
           user
        });
     })
     .catch((err) => {
        console.log(err);
     })
})

//edit put
router.put('/:householdId', (req, res) => {
  const updatedUser = req.body;
  const householdId= req.params.householdId;

  Households.findOneAndUpdate({ _id: householdId}, updatedUser, { new: true })
     .then(() => {
        res.redirect(`/households/${householdId}`);
     })
     .catch((err) => {
        console.log(err)
     })
})

//delete
router.get('/:householdId/delete', (req, res) => {
  const householdId= req.params.householdId;
  Households.findByIdAndRemove(householdId)
     .then((user) => {
        res.redirect('/households/');
     })
     .catch((err) => {
        console.log(err);
     })
})

module.exports = router;
