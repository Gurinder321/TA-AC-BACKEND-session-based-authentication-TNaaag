var express = require('express');
var router = express.Router();
var Article = require('../models/article');

/* GET home page. */
router.get('/', function (req, res, next) {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('articles', { articles });
  });
});

router.get('/new', (req, res) => {
  res.render('addArticle');
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  // handle here
});

// create article
router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.trim().split(' ');
  // handle here
  Article.create(req.body, (err, createdArticle) => {
    if (err) return next(err);
    res.render('/articles');
  });
});

// edit article form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    article.tags = article.tags.join(' ');
    if (err) return next(err);
    res.render('editArticleForm', { article });
  });
});

// update article
router.post('/:id', (req, res) => {
  var id = req.params.id;
  req.body.tags = req.body.tags.split(' ');
  // handle here
});

// delete article
router.get('/:id/delete', (req, res, next) => {
  // handle here
});

module.exports = router;
