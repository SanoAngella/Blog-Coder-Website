const express = require('express');
const Blog = require('../models/blog');
const requireAuth = require('../middleware/requireauth');

const router = express.Router();

router.get('/', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to load blogs');
    });
});

router.post('/', requireAuth, (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to create blog');
    });
});

router.get('/create', requireAuth, (req, res) => {
  res.render('create', { title: 'New Blog' });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).render('404', { title: 'Blog not found' });
      }
      return res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render('404', { title: 'Blog not found' });
    });
});

router.delete('/:id', requireAuth, (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to delete blog' });
    });
});

module.exports = router;
