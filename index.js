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
app.get('/', (req, res) => res.render('homepage'));
app.get('/update-cobj', (req, res) => res.redirect('/companies/add'));
app.post('/update-cobj', (req, res) => res.redirect(307, '/companies'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running: http://localhost:${PORT}`);
});
