const express = require('express');

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@blogcoder.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234';

router.get('/login', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    return res.redirect('/profile');
  }

  return res.render('login', { title: 'Login', error: null });
});

router.post('/login', (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const password = req.body.password || '';

  const validEmail = email === ADMIN_EMAIL.trim().toLowerCase();
  const validPassword = password === ADMIN_PASSWORD;

  if (!validEmail || !validPassword) {
    return res.status(401).render('login', {
      title: 'Login',
      error: 'Invalid email or password.',
    });
  }

  req.session.isAuthenticated = true;
  req.session.userEmail = email;

  return res.redirect('/profile');
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect('/profile');
    }
    return res.redirect('/login');
  });
});

module.exports = router;
