require('dotenv').config();
const mongoose = require('mongoose');
const Schema = require('./schema.js');

mongoose.connect(process.env.MONGODB_URI)
//seed heroku
//mongoose.connect('mongodb://heroku_tnb0x29x:lvnpvtjtumdlv443fgclnqnp7p@ds155934.mlab.com:55934/heroku_tnb0x29x')

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
   username: 'RJ123',
   name: 'Rory'
})

const patrick = new UserModel({
   username: 'PJ321',
   name: 'Patrick'
})

const apartmentOne = new HouseholdModel({
   username: 'Apartment 1',
   members: ['Rory', 'Patrick']
})

const omelette = new MealModel({
   name: 'Omelette',
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
   name: 'Meatloaf',
   meal: 'Dinner',
   day: 'Wednesday',
   ingredients: ['ground beef', 'corn', 'peas']
})

const users = [rory, apartmentOne, patrick];
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