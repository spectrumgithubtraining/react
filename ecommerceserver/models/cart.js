const mongoose = require("mongoose")

const Cart = mongoose.model('Cart',{
    id: String, // Unique identifier for the cart item
    userId: String,// User ID associated with the cart item
    productId: String, // Reference to the corresponding product
    quantity: Number, // Quantity of the product in the cart
    addedDate: Date, 

})
module.exports={Cart};