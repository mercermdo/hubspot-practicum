// Load required modules
const express = require('express');
const path = require('path');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware to parse form submissions
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine (Pug templates)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Import routes
const companiesRouter = require('./routes/companies.js');
app.use('/companies', companiesRouter); // All /companies routes handled here

// Root route (homepage)
app.get('/', (req, res) => {
  res.render('index', { title: 'HubSpot Practicum Project' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running: http://localhost:${PORT}`);
});
