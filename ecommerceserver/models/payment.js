const mongoose = require("mongoose")

const Payment = mongoose.model('Payment',{
    orderId: String,
    paymentId: String,
    signature: String,

})
module.exports={Payment};