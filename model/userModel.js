const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  // Implement the user schema fields:
  // name as String and
  // email as a String,
  name: {
    type: String,
    required: true,
  },
  email: {
    email: String,
    required: true,
  }
});

// Create and export the User model
module.export = mongoose.module("user", userSchema);
