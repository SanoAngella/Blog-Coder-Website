const express = require('express');
const Profile = require('../models/profile');

const router = express.Router();

const OWNER_KEY = 'main';

router.get('/', (req, res) => {
  Profile.findOne({ ownerKey: OWNER_KEY })
    .then((profile) => {
      res.render('profile', { title: 'My Profile', profile });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to load profile');
    });
});

router.get('/edit', (req, res) => {
  Profile.findOne({ ownerKey: OWNER_KEY })
    .then((profile) => {
      res.render('profile-edit', { title: 'Edit Profile', profile });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to open profile editor');
    });
});

router.post('/', (req, res) => {
  const skills = (req.body.skills || '')
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);

  const payload = {
    ownerKey: OWNER_KEY,
    fullName: req.body.fullName,
    headline: req.body.headline,
    bio: req.body.bio,
    location: req.body.location,
    skills,
    githubUrl: req.body.githubUrl,
    linkedinUrl: req.body.linkedinUrl,
  };

  Profile.findOneAndUpdate({ ownerKey: OWNER_KEY }, payload, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    runValidators: true,
  })
    .then(() => {
      res.redirect('/profile');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to save profile');
    });
});

module.exports = router;
