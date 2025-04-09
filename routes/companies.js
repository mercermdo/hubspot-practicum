const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Get your HubSpot token from .env
const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

// Route: Show form to add a company
router.get('/add', (req, res) => {
  res.render('add-company');
});

// Route: Handle form submission to create a new company
router.post('/', async (req, res) => {
    const { team_location, team_name, team_country, team_division } = req.body;
  
    try {
      const response = await axios.post(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
          properties: {
            team_location,
            team_name,
            team_country,
            team_division
          }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      res.send(`<h2>✅ Company "${team_location} / ${team_name}" created!</h2><a href="/companies/add">Add another</a>`);
    } catch (error) {
      console.error('Error creating company:', error.response?.data || error.message);
      res.status(500).send('❌ Error creating company.');
    }
  });
  

// Route: List all companies
router.get('/list', async (req, res) => {
    try {
      const response = await axios.get('https://api.hubapi.com/crm/v3/objects/companies', {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        params: {
          properties: ['team_name', 'team_location', 'team_country', 'team_division']
        }
      });
  
      const companies = response.data.results.filter(company => {
        const p = company.properties;
        return p.team_name && p.team_location && p.team_country && p.team_division;
      });
  
      res.render('companies', { companies });
    } catch (error) {
      console.error('Error fetching companies:', error.response?.data || error.message);
      res.status(500).send('❌ Error fetching companies');
    }
  });
  
  

module.exports = router;
