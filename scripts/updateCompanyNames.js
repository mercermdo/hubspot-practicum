const axios = require('axios');
require('dotenv').config();

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

async function fetchCompanies() {
    try {
      const response = await axios.get(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_TOKEN}`
          },
          params: {
            properties: ['team_name', 'team_location', 'team_country', 'team_division'],
            limit: 100
          }
        }
      );
  
      return response.data.results;
    } catch (error) {
      console.error('❌ Error fetching companies:', error.response?.data || error.message);
      return [];
    }
  }
  

async function updateCompanyName(id, newName) {
  try {
    await axios.patch(
      `https://api.hubapi.com/crm/v3/objects/companies/${id}`,
      {
        properties: {
          name: newName
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`✅ Updated record ${id} to "${newName}"`);
  } catch (error) {
    console.error(`❌ Error updating record ${id}:`, error.response?.data || error.message);
  }
}

async function run() {
    const companies = await fetchCompanies();
  
    for (const company of companies) {
      const { id, properties } = company;
  
      console.log(`🔍 Checking ID ${id}:`, properties);
  
      const { team_location, team_name } = properties;
  
      if (team_location && team_name) {
        const newName = `${team_location} ${team_name}`;
        await updateCompanyName(id, newName);
      } else {
        console.log(`⚠️ Skipping ID ${id} — missing location or name`);
      }
    }
  
    console.log('✅ All matching records updated.');
  }
  
  
run();
