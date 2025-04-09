// index.js

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 👇 Load your existing routes
const companiesRouter = require('./routes/companies.js');
app.use('/companies', companiesRouter);

// 👇 Required aliases
const axios = require('axios');

app.get('/', async (req, res) => {
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
    res.render('homepage', { companies });
  } catch (error) {
    console.error('❌ Error loading homepage:', error.response?.data || error.message);
    res.status(500).send('❌ Error loading homepage');
  }
});

app.get('/update-cobj', (req, res) => res.redirect('/companies/add'));
app.post('/update-cobj', (req, res) => res.redirect(307, '/companies'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running: http://localhost:${PORT}`);
});
