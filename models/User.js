const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // es5 way
const { Schema } = mongoose; // ES6 destructuring

// Mongo can have any properties for items in collection,
// but mongoose needs schema to be set up.

// Create new Schema
const userSchema = new Schema({
    googleId: String,
    facebookId: String
});

// Tell Mongoose to create new collection called users, using the user schema
// Will only create if it does not exist, otherwise will use existing collection.
mongoose.model('users', userSchema);