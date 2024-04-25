// Import required modules
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 by default

// Set up a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
