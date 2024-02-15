import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../Header';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import "../ViewProductPage/ViewProductPage.css"

function ViewProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [totalQuantity, setTotalQuantity] = useState(1);
  const isLoggedIn = sessionStorage.getItem('token');
  


  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/Product/viewProduct/${productId}`);
      setProductData(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1 && newQuantity <= 20) {
      setSelectedQuantity(newQuantity);
    } else {
      alert('Please enter a valid quantity (1-20)');
    }
  };
  const calculateTotalQuantity = (cart) => {
    let totalQuantity = 0;
    for (const productId in cart) {
      totalQuantity += cart[productId].quantity;
    }
    return totalQuantity;
  };
  

  const handleAddToCart = async () => {
    const isLoggedIn = sessionStorage.getItem('token');

    try {
      if (isLoggedIn) {
        const decodedToken = jwtDecode(isLoggedIn);
        const userId = decodedToken.userId;
        console.log("decoded",userId)

        // Get existing cart cookie or create an empty one
        const cartCookie = Cookies.get(userId) || '{}';
        const parsedCartCookie = JSON.parse(cartCookie);

        setTotalQuantity(calculateTotalQuantity(parsedCartCookie))


        // Check if the product is already in the cart
        if (parsedCartCookie[productId]) {
          // Update existing product quantity
          parsedCartCookie[productId].quantity += selectedQuantity;
          console.log('Product added to existing cart entry.');
          navigate('/checkOutPage', { state: { totalQuantity } });
          // Logging for debugging
        } else {
          // Add new product to cart cookie
          parsedCartCookie[productId] = {
            productDetails: productData,
            userId,
            quantity: selectedQuantity,
          };
          console.log('New product added to cart.'); // Logging for debugging
          navigate('/checkOutPage', { state: { totalQuantity } });
        }

        // Set the updated cart cookie
        Cookies.set(userId, JSON.stringify(parsedCartCookie));

        // Notify user of successful addition (visually or with a message)
        console.log('Cart cookie updated successfully.'); // Logging for debugging
      } else{
        // Handle the case where the user is not logged in
        console.log('User not logged in.'); // Logging for debugging
        // Redirect to login page or display a message
        navigate('/login');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle errors appropriately (e.g., display error messages)
    }
  };
  return (
    <div>
      <Header totalQuantity={totalQuantity} />

      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-4">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={productData.productImage}
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{productData.productName}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through"></span>
                <span>{`${productData.price} Rs`}</span>
                <br />
                <span>{`${productData.rating} Rating`}</span>
              </div>
              <p className="lead">{productData.description}</p>
              <div className="d-flex">
                <div className="quantity-group mb-3">
                  <span className="me-3">Quantity:</span>
                  <input className='btn btn-outline-dark flex-shrink-0 me-4 mt-2  '
                    type="number"
                    min={1}
                    max={20}
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                  />
                </div>
                <button
                  className="custom-button"
                  type="button"
                  onClick={handleAddToCart}
                >
                  <i className="bi-cart-fill me-1"></i> Add To cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewProductPage;
