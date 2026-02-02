const express = require("express");
const app = express();
// env variables
require("dotenv").config();

// Use the PORT Render provides or default to 3000
const PORT = process.env.PORT || 3000;

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello, Render!" });
});

// Example dynamic endpoint
app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});