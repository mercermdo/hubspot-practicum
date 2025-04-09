# HubSpot I: Foundations Practicum — Mercer West

This is my submission for the **Integrating with HubSpot I: Foundations** practicum. The project is a Node.js app that uses Express, Axios, and Pug to integrate with HubSpot's CRM API.

## ✅ Features Implemented

- Private app with proper scopes (CRM schemas & object permissions)
- Custom object requirements implemented using the standard **Company** object:
  - 3 custom properties:
    - `team_name` (string)
    - `team_location` (string)
    - `team_division` (string)
    - `team_country` (string)
  - `name` field is used as the display name
- HTML form to submit new records
- GET and POST routes with Axios
- Display of all records in a styled Pug view
- Clean and simple CSS styling
- `.env` used to keep private app token secure
- Git branching and commit history maintained

## 🧭 Required Routes

- `GET /` → homepage showing table of companies
- `GET /update-cobj` → form to add a team
- `POST /update-cobj` → handle form submission

## 🧪 Test Account and Object Link

Here is the direct link to the list view of my custom object in my developer test account:

🔗 [Custom Object List View](https://app.hubspot.com/contacts/46153275/objects/0-2/views/47192180/list)

## 🚀 Tech Stack

- Node.js
- Express
- Axios
- Pug
- CSS
- HubSpot CRM API

## ⚠️ Notes

- The private app token has been excluded using `.env` and `.gitignore`
- Records were re-added after migrating to the correct developer test account
- This app is for educational purposes only

## ✅ Final Checklist

- [x] Uses HubSpot test account
- [x] Includes custom object list link
- [x] Has 3+ properties including `name`
- [x] Creates 3+ records
- [x] Includes 3 required routes
- [x] Form submits and renders properly
- [x] GitHub repo is public with full history
