const express = require('express');
const path = require('path');
require('dotenv').config();
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 👇 Load your existing routes
const companiesRouter = require('./routes/companies.js');
app.use('/companies', companiesRouter); // Routes for companies handled here

// Homepage route ("/") - Displays introduction
app.get('/', (req, res) => {
  res.render('index', { title: 'HubSpot Practicum' });
});

// Companies list route
app.get('/companies/list', async (req, res) => {
  try {
    const response = await axios.get('https://api.hubapi.com/crm/v3/objects/companies', {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        properties: 'name,team_country,team_division',
        limit: 100
      }
    });

    const companies = response.data.results;
    res.render('companies', { companies }); // Pass the companies to the companies view
  } catch (error) {
    console.error('❌ Error loading companies:', error.response?.data || error.message);
    res.status(500).send('❌ Error loading companies');
  }
});

// Redirection routes for adding company
app.get('/update-cobj', (req, res) => res.redirect('/companies/add')); // Redirects to company addition form
app.post('/companies/add', (req, res) => {
    // Your logic to add the company here...
  
    // After adding the company, render the index.pug with success message
    res.render('index', { 
      title: 'HubSpot Practicum',
      message: 'Company added successfully!',
      addAnotherLink: '/companies/add',  // Link to add another company
      viewAllLink: '/companies/list'     // Link to view all companies
    });
});

    res.render('index', { 
      title: 'HubSpot Practicum',
      message: 'Company added successfully!',
      addAnotherLink: '/companies/add',
      viewAllLink: '/companies/list'
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running: http://localhost:${PORT}`);
});
