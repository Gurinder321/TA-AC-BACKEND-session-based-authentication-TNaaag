var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users');
});

// Handle a GET request on /users/register where render the registration form
router.get('/register', (req, res, next) => {
  res.render('register');
});

// Handle a POST request on /users/register where we will capture the data & save it into mongoDB database
router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

module.exports = router;
