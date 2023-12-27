import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../Header';
import { useNavigate } from 'react-router-dom';

function ViewProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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
  const handleAddToCheckout = async () => {
    const isLoggedIn = sessionStorage.getItem('token');
  
    try {
      if (isLoggedIn) {
        // Send token in request header
        const response = await axios.post('http://localhost:5000/api/admin/Cart/addCart', {
          productId,
          quantity: selectedQuantity
        }, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
  
        if (response.status === 201) {
          // Navigate to checkout after successful cart addition
          navigate(`/checkOutPage/${productId}`);
        } else {
          console.log("error from server")
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log("error",error)
    }
  };
  
  return (
    <div>
      <Header />

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
                  className="btn btn-outline-dark flex-shrink-0 me-3 "
                  type="button"
                  onClick={handleAddToCheckout}
                >
                  <i className="bi-cart-fill me-1"></i> Buy Now
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
