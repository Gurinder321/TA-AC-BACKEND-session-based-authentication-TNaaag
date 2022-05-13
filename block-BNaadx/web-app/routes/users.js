var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('users');
});

router.get('/register', (req, res, next) => {
  res.render('register', { error: req.flash('error')[0] });
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    // if (err) return next(err);
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        req.flash('error', 'this email is taken');
        return res.redirect('/users/register');
      }
      if (err.name === 'ValidationError') {
        req.flash('error', err.message);
        return res.redirect('/users/register');
      }
      return res.json({ err });
    }
    res.redirect('/users/login');
  });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    // no user
    if (!user) {
      return res.redirect('/users/login');
    }
    // user exists - compare password
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res.redirect('/users/login');
      }
      // persist logged in user information
      req.session.userId = user.id;
      res.redirect('/dashboard');
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
