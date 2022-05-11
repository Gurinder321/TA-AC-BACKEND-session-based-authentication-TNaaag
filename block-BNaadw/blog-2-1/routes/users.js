var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
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
      if (err.name === 'MongoError') {
        req.flash('error', 'this email is taken');
        return res.redirect('users/register');
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

router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error')[0] });
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email/Password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'This email is not registered');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Incorrect password');
        return res.redirect('/users/login');
      }
      // login user
      req.session.userId = user.id;
      res.redirect('/dashboard');
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  // res.clearCookie('connect.sid')
  res.redirect('/');
});

module.exports = router;
