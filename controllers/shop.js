const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // console.log(prodId);
  //Since this will be an asynchronous function.
  Product.findById(prodId, product => {
    // console.log(product);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });

  });
  // res.redirect("/");
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty
          });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, index) => {
  const prodId = req.body.productId;
  // console.log(prodId);
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    //Theroretically since here we are acessing the file, we should use callback
    res.redirect('/cart');
  })
  //We could also have used hidden input to send the price to the backend but according to Max this is the cleaner approach if we also passid through the request and then we do all the data retreival on the backend in our node express code
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};