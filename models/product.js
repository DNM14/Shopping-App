const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        //So we have to imagine that I created a new product instance then I will populate it with the information of my product and I just call save and then I find that I already have this project and replace it in the array which is stored in the file with the newly created product I am in.
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
        //writeFile will always replace all the old content, so we won't edit or anything like that.
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id); //This is require since we don't have any field in cart model which can give us the price
      const updatedProducts = products.filter(prod => prod.id !== id); //all elements which satisfy the given condition in the function
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price); //So passing the product.price is necessary
          //If we have products in the products-list but not in the cart then deleting it will simply make the function(Cart.deleteProduct) to return
        }
      })
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id); //returns the element if the functionwe passed returns true 
      //The above one is a synchronous function
      cb(product);
    });
  }
};