
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useProduct } from '../../../context/ProductContext'; // Adjust the path accordingly

const CheckoutPage = () => {
  const [userData, setUserData] = useState({ email: '', address: '', contact: '' });
  const { productId } = useParams();
  const { productData } = useProduct(); // Accessing product data from the context
  const [product, setProduct] = useState('');

  // Fetch product data
  const fetchProduct = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/admin/Product/viewProduct/${productId}`);
      setProduct(result.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);
  debugger;

  // Assuming productData contains quantity information
  const { quantity } = productData;

  // Calculate total price based on quantity
  const totalPrice = product && quantity ? product.price * quantity : 0;

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Add logic to place the order and redirect to the confirmation page
    // For simplicity, just redirect to a confirmation page in this example

  };


  return (
    <div className="container mt-5">
      <h1 className="mb-4">Checkout</h1>
      {product && (
        <div className="row">
          <div className="col-md-6">
            {/* Product Information */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">Price: {product.price} $</p>
                {/* Add more product details as needed */}
              </div>
            </div>

            {/* User Information Form */}
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                  value={userData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Add more form fields as needed */}
            </form>
          </div>

          <div className="col-md-6">
            {/* Order Summary */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <p className="card-text">Product: {product.productName}</p>
                <p className="card-text">Total Price: {totalPrice} $</p>
                {/* Add more order details as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Place Order Button */}
      <div className="mt-4">
        <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
