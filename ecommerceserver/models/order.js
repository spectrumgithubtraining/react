const mongoose = require('mongoose');

const Order = mongoose.model('Order', {
  orderId:String,
  userId: String,
  products: [
    {
      productId: String,
      quantity: Number,
      totalPrice:Number
    },
  ],
  firstName: String,
  lastName: String,
  companyName: String,
  address: String,
  email: String,
  phone: String,
  additionalInfo: String,
  totalPrice:Number,

  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {Order};
