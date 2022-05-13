let express = require('express');

let Product = require('../models/product');

let router = express.Router();
//page for creating product
router.get('/new', (req, res, next) => {
  res.render('addProduct');
});

//create product with details and save it in DB
router.post('/new', (req, res, next) => {
  Product.create(req.body, (err, product) => {
    console.log(req.body);
    if (err) {
      return next(err);
    }
    res.redirect('/products');
  });
});

//render all products
router.get('/', (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) {
      return next(err);
    }
    res.render('products', { products: products });
  });
});

// fetch only one article
router.get('/:id', (req, res, next) => {
  if (req.session && req.session.userId) {
    var id = req.params.id;
    Product.findById(id).exec((err, product) => {
      if (err) return next(err);
      res.render('productDetail.ejs', { product });
    });
  } else {
    res.redirect('/users/login');
  }
});

//updating article form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Product.findById(id, (err, product) => {
    if (err) return next(err);
    res.render('editProduct', { product });
  });
});

// update article
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, (err, updateProduct) => {
    if (err) return next(err);
    res.redirect('/products/' + id);
  });
});

// deleting products
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Product.findByIdAndDelete(id, (err, product) => {
    if (err) return next(err);
    res.redirect('/products');
  });
});

module.exports = router;
