const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@blogcoder.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234';

router.get('/login', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    return res.redirect('/profile');
  }

  return res.render('login', { title: 'Login', error: null });
});

router.get('/signup', (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    return res.redirect('/profile');
  }

  return res.render('signup', { title: 'Sign Up', error: null });
});

router.post('/login', (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const password = req.body.password || '';

  return User.findOne({ email })
    .then(async (user) => {
      if (user) {
        const validPassword = await bcrypt.compare(password, user.passwordHash);

        if (!validPassword) {
          return res.status(401).render('login', {
            title: 'Login',
            error: 'Invalid email or password.',
          });
        }

        req.session.isAuthenticated = true;
        req.session.userEmail = user.email;
        return res.redirect('/profile');
      }

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
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).render('login', {
        title: 'Login',
        error: 'Unable to login right now. Please try again.',
      });
    });
});

router.post('/signup', (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const password = req.body.password || '';
  const confirmPassword = req.body.confirmPassword || '';

  if (!email || !password) {
    return res.status(400).render('signup', {
      title: 'Sign Up',
      error: 'Email and password are required.',
    });
  }

  if (password.length < 8) {
    return res.status(400).render('signup', {
      title: 'Sign Up',
      error: 'Password must be at least 8 characters.',
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).render('signup', {
      title: 'Sign Up',
      error: 'Passwords do not match.',
    });
  }

  return User.findOne({ email })
    .then(async (existingUser) => {
      if (existingUser) {
        return res.status(409).render('signup', {
          title: 'Sign Up',
          error: 'An account with this email already exists.',
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const user = new User({ email, passwordHash });
      await user.save();

      req.session.isAuthenticated = true;
      req.session.userEmail = user.email;
      return res.redirect('/profile');
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).render('signup', {
        title: 'Sign Up',
        error: 'Unable to create account right now. Please try again.',
      });
    });
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
