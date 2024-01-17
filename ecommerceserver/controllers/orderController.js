const {Order} = require('../models/order');

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    // Extract order details from the request body
    const {
      orderId,
      userId,
      products, // Assuming an array of products in the order
      firstName,
      lastName,
      companyName,
      address,
      email,
      phone,
      additionalInfo,
      totalPrice
    
    } = req.body;

    // Create a new Order document
    const newOrder = new Order({
      orderId,
      userId,
      products,
      firstName,
      lastName,
      companyName,
      address,
      email,
      phone,
      additionalInfo,
      totalPrice,
      orderDate: new Date(), // You might want to timestamp the order
    });

    // Save the order to the database
    await newOrder.save();

    res.status(200).json({ success: true, order: newOrder,message:"order saved successfully" });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const detailsOrder = async (req,res)=>{
  try{

    const{orderId} = req.body

    const orderDetails = Order.findOne({orderId})
    .then(()=>{
      res.status(200).json({ success: true, orderDetails,message:"order details" });
    })
    .catch((error)=>{
      res.status(400).json({message:"error message"})
    })
    
  }
  catch(error){
    console.error("error",error)

  }

}

module.exports = { createOrder ,detailsOrder};
