const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const blogRoutes = require('./route/blogroutes');
const profileRoutes = require('./route/profileroutes');

const DBURI = process.env.DBURL;
const PORT = process.env.PORT || 3000;

const app = express();

if (!DBURI) {
  console.error('Missing DBURL in .env. Add your MongoDB URI and restart the app.');
  process.exit(1);
}

mongoose.connect(DBURI)
  .then(() => {
    console.log('connected to db');
    app.listen(PORT, () => console.log('Listening on port ' + PORT));
  })
  .catch((err) => {
    console.log('Connection Error:', err);
  });

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);
app.use('/profile', profileRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page not found' });
});
