const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   meal: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner'],
      required: true
   },
   day: {
      type: String,
      enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      required: true
   },
   ingredients: {
      type: [String],
   },
   chef: {
      type: String
   }   
})

const UserSchema = new Schema({
   username: {
      type: String,
      //unique: true,
      required: true
   },
   name:{
      type: String,
      required: true
   },
   /*password: {
      type: String,
      required: true
   },*/
   meals: [MealSchema]
})

const HouseholdSchema = new Schema({
   name: {
      type: String,
      //unique: true,
      required: true
   },
   /*password: {
      type: String,
      required: true
   },*/
   meals: [MealSchema],
   members: {
      type: [String]
   }
})

const UserModel = mongoose.model('User', UserSchema);
const HouseholdModel = mongoose.model('Household', HouseholdSchema);
const MealModel = mongoose.model('Meal', MealSchema);
module.exports = {
   UserModel,
   HouseholdModel,
   MealModel
}