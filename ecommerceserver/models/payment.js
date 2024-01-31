const mongoose = require("mongoose")

const Payment = mongoose.model('Payment', {
    orderId: String,
    paymentId: String,
    signature: String,
    userId: String,
    products: [
        {
            productId: String,
            productName: String,
            quantity: Number,
            totalPrice: Number
        },
    ],
    firstName: String,
    lastName: String,
    companyName: String,
    address: String,
    email: String,
    phone: String,
    additionalInfo: String,
    totalPrice: Number,

    orderDate: {
        type: Date,
        default: Date.now,
    }

    })
module.exports = { Payment };