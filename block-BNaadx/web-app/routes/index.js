var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', (req, res) => {
  console.log(req.session);
  res.render('dashboard');
});

router.get('/protected', auth.loggedInUser, (req, res) => {
  res.send('Protected Resource');
});

module.exports = router;
