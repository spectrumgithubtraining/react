const mongoose = require("mongoose")

const Product = mongoose.model('Product', {
  id: String,
  productName: String,
  categoryId: String,
  description: String,
  price: Number,
  isAvailable: Boolean,
  productImage: String,
  rating: String,
  review: String,
  vendorName: String,
  warranty: String,

})
module.exports = { Product };