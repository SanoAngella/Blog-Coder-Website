// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const Blog = require('./models/blog');

// const app = express();

// // 1. DATABASE CONNECTION
// const dbURI = YOUR OWN DbURI';

// mongoose.connect(dbURI)
//   .then((result) => {
//     console.log('connected to db');
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log('Connection Error:', err);
//   });

// // 2. SETTINGS & MIDDLEWARE
// app.set('view engine', 'ejs');

// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true })); // This is the most important line for Tutorial 10
// app.use(morgan('dev'));

// // 3. ROUTES

// // Redirect home to blogs
// app.get('/', (req, res) => {
//   res.redirect('/blogs');
// });

// // GET all blogs to display on home page (Tutorial 10)
// app.get('/blogs', (req, res) => {
//   Blog.find().sort({ createdAt: -1 })
//     .then((result) => {
//       res.render('index', { title: 'All Blogs', blogs: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // POST a new blog to the database (The missing part from Tutorial 10)
// app.post('/blogs', (req, res) => {
//   // console.log(req.body); // Useful to see if data is reaching the server
//   const blog = new Blog(req.body);

//   blog.save()
//     .then((result) => {
//       res.redirect('/blogs'); // Redirect home after saving
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Render the "Create Blog" form
// app.get('/blogs/create', (req, res) => {
//   res.render('create', { title: 'New blog' });
// });

// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About' });
// });

// // Sandbox route for testing
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'New Blog Success',
//     snippet: 'This came from the database',
//     body: 'The database is now keeping my data!'
//   });

//   blog.save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });


// // 404 PAGE
// app.use((req, res) => {
//   res.status(404).render('404', { title: 'Page Not found' });
// });
// 
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const Blog = require('./models/blog');
const DBURI = process.env.DBURL;
const PORT = process.env.PORT || 3000;

const app = express();

// 1. DATABASE CONNECTION

mongoose.connect(DBURI)
  .then((result) => {
    console.log('connected to db');
    app.listen(PORT, () => console.log('Listening on port '+PORT)) 
  })
  .catch((err) => {
    console.log('Connection Error:', err);
  });

// 2. SETTINGS & MIDDLEWARE
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));

// 3. ROUTES

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// BLOG ROUTES
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'New blog' });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      res.status(404).render('404', { title: 'Blog not found' });
    });
});


app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      // When using fetch API in the frontend, we must send a JSON response
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 PAGE
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not found' });
});
