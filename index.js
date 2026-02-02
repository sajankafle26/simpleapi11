const express = require("express");
const app = express();
const mongoose = require("mongoose");
// env variables
require("dotenv").config();

// Use the PORT Render provides or default to 3000
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello, Render!" });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // try connecting for 5 seconds
})
// Example dynamic endpoint
app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create new user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});