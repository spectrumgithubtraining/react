const express = require('express');
const router = express.Router();
const {Cart} = require('../models/cart'); // Replace with your Cart model path
const {Product} = require('../models/product');
const validateToken =require("../middleware/tokenValidation")

// Middlewares (optional):
// - User authentication middleware to check for logged-in user
// - Authorization middleware to ensure access to user's own cart

// Add an item to cart
router.post('/addCart',validateToken,async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  // Validate request body, check product existence, and ensure valid quantity

  // Create and save cart item
  const cartItem = new Cart({ userId, productId, quantity });
  try {
    await cartItem.save();
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product to cart' });
  }
});router.get('/viewCart/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const productCart = await Cart.findOne({ productId });

    if (!productCart) { 
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ productCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// // Get all cart items for current user
// router.get('/', async (req, res) => {
//   const cartItems = await Cart.find({ userId: req.user._id }); // Use user ID if applicable

//   // Populate Product data for each cart item (optional)
//   await Promise.all(cartItems.map(async (item) => {
//     const product = await Product.findById(item.productId);
//     item.product = product;
//   }));

//   res.status(200).json({ cartItems });
// });

// // Update quantity of an item
// router.put('/:cartItemId', async (req, res) => {
//   const { cartItemId } = req.params;
//   const { quantity } = req.body;

//   // Validate request body
//   if (!quantity || typeof quantity !== 'number') {
//     return res.status(400).json({ message: 'Invalid request body' });
//   }

//   // Find cart item
//   const cartItem = await Cart.findById(cartItemId);
//   if (!cartItem) {
//     return res.status(404).json({ message: 'Cart item not found' });
//   }

//   // Ensure valid quantity
//   if (quantity <= 0) {
//     return res.status(400).json({ message: 'Invalid quantity' });
//   }

//   // Update quantity and stock (optional)
//   cartItem.quantity = quantity;
//   const product = await Product.findById(cartItem.productId);
//   product.stock -= cartItem.quantity - quantity; // Adjust stock change
//   await cartItem.save();
//   await product.save();

//   res.status(200).json({ message: 'Item quantity updated successfully', cartItem });
// });

// // Remove an item from cart
// router.delete('/:cartItemId', async (req, res) => {
//   const { cartItemId } = req.params;

//   // Find and remove cart item
//   const cartItem = await Cart.findByIdAndDelete(cartItemId);
//   if (!cartItem) {
//     return res.status(404).json({ message: 'Cart item not found' });
// }

// // Update product stock (optional)
// const product = await Product.findById(cartItem.productId);
// product.stock += cartItem.quantity;
// await product.save();

// res.status(200).json({ message: 'Item removed from cart successfully' });
// });

// // Clear user's cart (optional)
// router.delete('/', async (req, res) => {
// // Check user ID if applicable
// await Cart.deleteMany({ userId: req.user._id }); // Use user ID if applicable

// res.status(200).json({ message: 'Cart cleared successfully' });
// });

module.exports = router;