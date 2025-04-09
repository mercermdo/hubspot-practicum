const axios = require('axios');
require('dotenv').config();

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

const teams = [
  { team_name: 'Maple Leafs', team_location: 'Toronto', team_country: 'Canada', team_division: 'Atlantic' },
  { team_name: 'Canadiens', team_location: 'Montreal', team_country: 'Canada', team_division: 'Atlantic' },
  { team_name: 'Senators', team_location: 'Ottawa', team_country: 'Canada', team_division: 'Atlantic' },
  { team_name: 'Jets', team_location: 'Winnipeg', team_country: 'Canada', team_division: 'Central' },
  { team_name: 'Flames', team_location: 'Calgary', team_country: 'Canada', team_division: 'Pacific' },
  { team_name: 'Oilers', team_location: 'Edmonton', team_country: 'Canada', team_division: 'Pacific' },
  { team_name: 'Canucks', team_location: 'Vancouver', team_country: 'Canada', team_division: 'Pacific' },
  { team_name: 'Bruins', team_location: 'Boston', team_country: 'USA', team_division: 'Atlantic' },
  { team_name: 'Sabres', team_location: 'Buffalo', team_country: 'USA', team_division: 'Atlantic' },
  { team_name: 'Red Wings', team_location: 'Detroit', team_country: 'USA', team_division: 'Atlantic' },
  { team_name: 'Panthers', team_location: 'Florida', team_country: 'USA', team_division: 'Atlantic' },
  { team_name: 'Lightning', team_location: 'Tampa Bay', team_country: 'USA', team_division: 'Atlantic' },
  { team_name: 'Hurricanes', team_location: 'Carolina', team_country: 'USA', team_division: 'Metropolitan' },
  { team_name: 'Blue Jackets', team_location: 'Columbus', team_country: 'USA', team_division: 'Metropolitan' },
  { team_name: 'Devils', team_location: 'New Jersey', team_country: 'USA', team_division: 'Metropolitan' },
  { team_name: 'Islanders', team_location: 'New York', team_country: 'USA', team_division: 'Metropolitan' },
  { team_name: 'Rangers', team_location: 'New York', team_country: 'USA', team_division: 'Metropolitan' },
  { team_name: 'Flyers', team_location: 'Philadelphia', team_country: 'USA', team_division: 'Metropolitan' },
  { team_name: 'Penguins', team_location: 'Pittsburgh', team_country: 'USA', team_division: 'Metropolitan' },
  { team_name: 'Capitals', team_location: 'Washington', team_country: 'USA', team_division: 'Metropolitan' },
  { team_name: 'Blackhawks', team_location: 'Chicago', team_country: 'USA', team_division: 'Central' },
  { team_name: 'Avalanche', team_location: 'Colorado', team_country: 'USA', team_division: 'Central' },
  { team_name: 'Stars', team_location: 'Dallas', team_country: 'USA', team_division: 'Central' },
  { team_name: 'Wild', team_location: 'Minnesota', team_country: 'USA', team_division: 'Central' },
  { team_name: 'Predators', team_location: 'Nashville', team_country: 'USA', team_division: 'Central' },
  { team_name: 'Blues', team_location: 'St. Louis', team_country: 'USA', team_division: 'Central' },
  { team_name: 'Coyotes', team_location: 'Arizona', team_country: 'USA', team_division: 'Central' },
  { team_name: 'Ducks', team_location: 'Anaheim', team_country: 'USA', team_division: 'Pacific' },
  { team_name: 'Flames', team_location: 'Calgary', team_country: 'Canada', team_division: 'Pacific' },
  { team_name: 'Kings', team_location: 'Los Angeles', team_country: 'USA', team_division: 'Pacific' },
  { team_name: 'Sharks', team_location: 'San Jose', team_country: 'USA', team_division: 'Pacific' },
  { team_name: 'Kraken', team_location: 'Seattle', team_country: 'USA', team_division: 'Pacific' },
  { team_name: 'Canucks', team_location: 'Vancouver', team_country: 'Canada', team_division: 'Pacific' },
  { team_name: 'Golden Knights', team_location: 'Vegas', team_country: 'USA', team_division: 'Pacific' }
];

// ❗ Exclude Detroit and Carolina teams
const filteredTeams = teams.filter(
  t => !(t.team_location === 'Detroit' && t.team_name === 'Red Wings') &&
       !(t.team_location === 'Carolina' && t.team_name === 'Hurricanes')
);

async function createTeam(team) {
  const payload = {
    properties: {
      name: `${team.team_location} ${team.team_name}`,
      team_location: team.team_location,
      team_name: team.team_name,
      team_country: team.team_country,
      team_division: team.team_division
    }
  };

  try {
    await axios.post('https://api.hubapi.com/crm/v3/objects/companies', payload, {
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Created: ${payload.properties.name}`);
  } catch (error) {
    console.error(`❌ Error creating ${payload.properties.name}:`, error.response?.data || error.message);
  }
}

async function run() {
  for (const team of filteredTeams) {
    await createTeam(team);
  }

  console.log('🎉 Done creating hockey teams');
}

run();
