let express = require('express');
let Product = require('../models/product');
let router = express.Router();
var auth = require('../middlewares/auth');

//render all products
router.get('/', (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) {
      return next(err);
    }
    res.render('products', { products: products });
  });
});

//page for creating product
router.get('/new', auth.loggedInUser, (req, res, next) => {
  res.render('addProduct');
});

// fetch only one article
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  // Product.findById(id).exec((err, product) => {
  //   if (err) return next(err);
  //   res.render('productDetail.ejs', { product });
  // });
  Product.findById(id)
    .populate('author', 'name email')
    .exec((err, product) => {
      console.log(err, product);
      if (err) return next(err);
      res.render('productDetail.ejs', { product });
    });
});

router.use(auth.loggedInUser);

//create product with details and save it in DB
router.post('/new', (req, res, next) => {
  req.body.author = req.user._id;
  Product.create(req.body, (err, product) => {
    console.log(req.body);
    if (err) {
      return next(err);
    }
    res.redirect('/products');
  });
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
  // check whether current logged in user matches with the author of the articles
  var id = req.params.id;
  Product.findByIdAndDelete(id, (err, product) => {
    if (err) return next(err);
    res.redirect('/products');
  });
});

module.exports = router;
