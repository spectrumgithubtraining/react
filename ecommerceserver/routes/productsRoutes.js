const express = require('express');
const router = express.Router();
const { productValidationRules, validate } = require('../validation/admin');
const {Product} = require('../models/product');
const { resolvePath } = require('react-router-dom');
const createOrder = require('../controllers/orderController')

// Route to add a new product

router.post('/addProduct' ,async (req, res) => {
  const { id, productName, categoryId, description, price, isAvailable, productImage, rating, review, vendorName, warranty } = req.body;
  
  try {
    console.log('Received data:', req.body);
    const existingProduct = await Product.findOne({ id });

    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this ID already exists' });
    }

    const product = new Product({ id, productName, categoryId, description, price, isAvailable, productImage, rating, review, vendorName, warranty });
    await product.save();

    res.status(201).json ({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
});


router.put('/editProduct/:productId', productValidationRules(), validate, async (req, res) => {
    const productId = req.params.productId;
    const updatedProductData = req.body;
  
    try {
      // Find the product by ID
      const product = await Product.findOne({ id: productId });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Update the product with the new data
      Object.assign(product, updatedProductData);
      await product.save();
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error });
    }
  });
  // Assuming the route for deleting a product is "/dashboard/delete-product/:productId"
  router.delete('/delete-product/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      // Find the product by ID and delete it
      const deletedProduct = await Product.findOneAndDelete({id: productId });
  
      // Check if the product was not found
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Respond with a success message
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      // Handle server errors
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  router.get("/viewProduct", async (req,res)=>{
    
    try{
      const viewProducts = await Product.find()
      if(viewProducts){
         res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
          message:"The products",
          product:viewProducts
        })
      }
      else{
        res.status(400).json(
          {
           message: "error in fetching product"
          })
      }

    } 
    catch{
      console.log('error')


    }
  })

  router.get('/viewProduct/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    // Find the product by ID
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});
router.post('/orders', createOrder.createOrder);

// router.get('details',createOrder.detailsOrder)
  
module.exports = router;

