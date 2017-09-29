var express = require('express');
var router = express.Router({ mergeParams: true });

const Schema = require('../db/schema');

const Users = Schema.UserModel;

//index
router.get('/', (req, res) => {
   const userId = req.params.userId;
   Users.findById(userId)
      .then((user) => {
         console.log(user);
         res.render('meals/show', {
            user: user
         });
      })
      .catch((err) => { console.log(err) })
})

//create
router.get('/new', (req, res) => {
   const userId = req.params.userId;
   console.log(userId);
   res.render('meals/new', {
      userId
   })
})

//edit
router.get('/:mealId/edit', (req, res) => {
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

//delete
router.get('/:mealId/delete', (req, res) => {
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

//create put
router.post('/', (req, res) => {
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
         console.log(user._id);
         res.redirect(`/users/${user._id}/meals`);
      })
})

module.exports = router;