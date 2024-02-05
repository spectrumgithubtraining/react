const mongoose = require("mongoose")

const WishList = mongoose.model('WishList', {
    userId : String,
  productId: String,

})
module.exports = { WishList };