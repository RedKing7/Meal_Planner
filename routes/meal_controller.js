var express = require('express');
var router = express.Router({ mergeParams: true });

const Schema = require('../db/schema');

const Users = Schema.UserModel;
const Households = Schema.HouseholdModel;

//index
router.get('/', (req, res) => {
      const isHousehold = ('true' === req.params.isHousehold);
      const userId = req.params.userId;
      if(isHousehold){
            Households.findById(userId)
            .then((user) => {
                  res.render('meals/show', {
                  user,
                  isHousehold
                  });
            })
            .catch((err) => { console.log(err) })
      } else {
            Users.findById(userId)
            .then((user) => {
                  res.render('meals/show', {
                  user,
                  isHousehold
                  });
            })
            .catch((err) => { console.log(err) })
      }
})

//create
router.get('/new', (req, res) => {
      const isHousehold = ('true' === req.params.isHousehold);
      const userId = req.params.userId;

      res.render('meals/new', {
            userId,
            isHousehold
      })
})

//view
router.get('/:mealId', (req, res) => {
   const isHousehold = ('true' === req.params.isHousehold);

   const userId = req.params.userId;
   const mealId = req.params.mealId;

   Users.findById(userId)
      .then((user)=>{
         const meal = user.meals.id(mealId);
         res.render('meals/view', {
            meal,
            ingredients: meal.ingredients,
            userId
         })
      })
      .catch((err)=>{console.log(err)})
})

//create put
router.post('/', (req, res) => {
      const isHousehold = ('true' === req.params.isHousehold);

   const userId = req.params.userId;
   const newMeal = req.body;

   Users.findById(userId)
      .then((user) => {
         //split ingredients string into an array
         let ingredients = newMeal.ingredients;
         ingredients = ingredients.split(', ');
         newMeal.ingredients = ingredients;

         user.meals.push(newMeal)
         return user.save()
      })
      .then((user) => {
         res.redirect(`/users/${user._id}/meals`);
      })
})

//edit
router.get('/:mealId/edit', (req, res) => {
      const isHousehold = ('true' === req.params.isHousehold);

   const userId = req.params.userId;
   const mealId = req.params.mealId;

   Users.findById(userId)
      .then((user) => {
         const meal = user.meals.id(mealId);
         res.render('meals/edit', {
            meal,
            ingredients: meal.ingredients.join(', '),
            userId
         })
      })
})

//edit put
router.put('/:mealId', (req, res) => {
      const isHousehold = ('true' === req.params.isHousehold);
   
   const userId = req.params.userId;
   const mealId = req.params.mealId;
   const updatedMeal = req.body;

   Users.findById(userId)
      .then((user) => {
         const meal = user.meals.id(mealId);

         meal.name = updatedMeal.name
         meal.meal = updatedMeal.meal
         meal.day = updatedMeal.day
         meal.ingredients = updatedMeal.ingredients.split(', ')
         meal.chef = updatedMeal.chef

         return user.save();
      })
      .then(() => {
         res.redirect(`/users/${userId}/meals/${mealId}`)
      })
      .catch((err) => {
         console.log(err);
      })
})

//delete
router.get('/:mealId/delete', (req, res) => {
      const isHousehold = ('true' === req.params.isHousehold);
   
   const userId = req.params.userId;
   const mealId = req.params.mealId;

   Users.findById(userId)
      .then((user) => {
         const meal = user.meals.id(mealId).remove(); //nice and easy
         return user.save(); //must do this, or change wont be saved
      })
      .then(() => {
         res.redirect(`/users/${userId}/meals`)
      })
      .catch((err) => {
         console.log(err);
      })
})

module.exports = router;