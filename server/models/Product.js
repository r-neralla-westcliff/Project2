const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  color: String,
  size: String,
  brand: String
});

module.exports = mongoose.model('Product', productSchema);
