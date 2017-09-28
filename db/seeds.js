require('dotenv').config();
const mongoose = require('mongoose');
const Schema = require('./schema.js');

mongoose.connect(process.env.MONGODB_URI)
//seed heroku
//mongoose.connect('')

const db = mongoose.connection;

db.on('open', () => {
   console.log('database has been connected')
})


const UserModel = Schema.UserModel;
const HouseholdModel = Schema.HouseholdModel;
const MealModel = Schema.MealModel;

UserModel.remove({}, (err) => {
   console.log(err);
})
HouseholdModel.remove({}, (err) => {
   console.log(err);
})

const rory = new UserModel({
   username: 'RJ97'
})

const apartmentOne = new HouseholdModel({
   username: 'Apartment 1',
   members: ['Rory', 'Patrick']
})

const omelette = new MealModel({
   name: 'omelette',
   meal: 'Breakfast',
   day: 'Monday',
   ingredients: ['eggs', 'cheese', 'green onions']
})

const pbj = new MealModel({
   name: 'PBJ sandwhiches',
   meal: 'Lunch',
   day: 'Tuesday',
   ingredients: ['bread', 'peanut butter', 'jelly']
})

const meatloaf = new MealModel({
   name: 'meatloaf',
   meal: 'Dinner',
   day: 'Wednesday',
   ingredients: ['hamburger', 'corn', 'peas']
})

const users = [rory, apartmentOne];
const meals = [omelette, pbj, meatloaf];

users.forEach((user) => {

   user.meals = meals;

   user.save()
      .then((user) => {
         console.log(user.username + '\'s Meals saved')
      })
      .catch((error) => {
         console.log(error);
      })
})

db.close();