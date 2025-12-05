// Import the necessary modules and models
const User = require('../model/userModel');
const express = require('express');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  // Implement user creation logic here
  // 1. Extract user data from the request body (req.body)
  // 2. Create a new user using User.create()
  // 3. Handle success: Respond with a 201 status code and the created user
  // 4. Handle errors: Respond with appropriate error messages and status codes
    const body = req.body;
    if(!body || !body.name || !body.email){
      return res.status(500).json({msg: "Internal server error"})
    }
    await User.create({
      name: body.name,
      email: body.email,
    })

    res.status(201).json({msg: "User created"});

});

// Retrieve a user by ID
router.get('/users/:id', async (req, res) => {
    const user = User.findById(req.params.id);
     if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(201).json({msg: "Profile data"}, user);
  // Implement user retrieval logic here
  // 1. Extract the user ID from the request parameters (req.params.id)
  // 2. Find the user by ID using User.findById()
  // 3. Handle success: Respond with a 200 status code and the user data
  // 4. Handle errors: Respond with appropriate error messages and status codes
});

// Update a user by ID
router.patch('/users/:id', async (req, res) => {
  // Implement user update logic here
  // 1. Extract the user ID from the request parameters (req.params.id)
  // 2. Extract updated user data from the request body (req.body)
  // 3. Use User.findByIdAndUpdate() to update the user
  // 4. Handle success: Respond with a 200 status code and the updated user data
  // 5. Handle errors: Respond with appropriate error messages and status codes
  const body = req.body;
  const id = await User.findById(req.params.id);
  if(!id){
    return res.status(404).json({msg: "User not found"});
  }
  
  const user = await User.findByIdAndUpdate(id, {name: body.name, email: body.email});
  return res.status(201).json({msg: "User updated"}, user);

});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  // Implement user deletion logic here
  // 1. Extract the user ID from the request parameters (req.params.id)
  // 2. Use User.findByIdAndDelete() to delete the user
  // 3. Handle success: Respond with a 200 status code and a deletion confirmation message
  // 4. Handle errors: Respond with appropriate error messages and status codes
  
  const id = await User.findByIdAndDelete(req.params.id);
  if(!id){
  const id = User.findById(req.params.id);
    return res.status(404).json({msg: "User not found"})
  }
  return res.status(200).json({msg: "User deleted"})

});


module.exports = router;
