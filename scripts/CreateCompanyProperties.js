const axios = require('axios');
require('dotenv').config();

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

const properties = [
  {
    name: 'team_name',
    label: 'Team Name',
    type: 'string',
    fieldType: 'text',
    groupName: 'companyinformation',
    description: 'Name of the hockey team'
  },
  {
    name: 'team_location',
    label: 'Team Location',
    type: 'string',
    fieldType: 'text',
    groupName: 'companyinformation',
    description: 'City or region of the hockey team'
  },
  {
    name: 'team_country',
    label: 'Team Country',
    type: 'string',
    fieldType: 'text',
    groupName: 'companyinformation',
    description: 'Country of the hockey team'
  },
  {
    name: 'team_division',
    label: 'Team Division',
    type: 'string',
    fieldType: 'text',
    groupName: 'companyinformation',
    description: 'Division of the hockey team'
  }
];

async function createProperty(prop) {
  try {
    const res = await axios.post(
      'https://api.hubapi.com/crm/v3/properties/companies',
      prop,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`✅ Created property: ${prop.name}`);
  } catch (err) {
    const category = err.response?.data?.category;
    const subCategory = err.response?.data?.subCategory;
    if (category === 'CONFLICT' || subCategory === 'Properties.PROPERTY_WITH_NAME_EXISTS') {
      console.log(`⚠️ Property ${prop.name} already exists.`);
    } else {
      console.error(`❌ Error creating ${prop.name}:`, err.response?.data || err.message);
    }
  }
}

async function run() {
  for (const prop of properties) {
    await createProperty(prop);
  }
}

run();
