const Product = require('../models/product');

//controllers are all the middleware functions

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //If we find it, it will define true else it will give undefined (which is also treated as false)
  //This is a kind of redundant thing to do, bcz here we actually know that we want to edit the product
  if (!editMode) { //if we dont't define editMode in url then this will get undefined (which will be taken as false)
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/'); //Not a good user experience, most of the times we would want to show an error
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
}

exports.postEditProduct = (req, res, next) => {
  //Since it is a post request, we expect to get that information in the request body
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save(); //Here a callback in save would be best
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId); //According to Max, it would be best if we have a callback in deleteById so that we can only redirect once we are done the same is true for updating in line no51
  //That functionality of callback will be added later
  res.redirect('/admin/products');
}