import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../Header';
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../../../context/ProductContext';



function ViewProductPage() {

  const { setproduct } = useProduct
  const [product, setProduct] = useState({});
  const [loggedIn, setLoggedIn] = useState("")
  const [quantity,setQuantity]=useState(1)

  const { productId } = useParams();
  const navigate = useNavigate();

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
    setLoggedIn(sessionStorage.getItem('token') !== null);
  }, [productId]);



  const handleBuyNow = () => {
    const productData = {
      productId,
      quantity,
      // Other product data
    };

    setProduct(productData);

    if (loggedIn) {
      alert("logged in");
      navigate(`/CheckoutPage/${productId}`);
      sessionStorage.setItem("BuyProductId", productId);
    } else {
      alert("not logged in");
      navigate('/login');
    }
  };
  const increaseQuantity=()=>{
    setQuantity((prevQuantity)=>prevQuantity+1)
    
  }

  const decreaseQuantity=()=>{
    setQuantity((prevQuantity)=>Math.max(1,prevQuantity-1))
  }




  return (

    <div>
      <Header></Header>

      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-4">
              <img className="card-img-top mb-5 mb-md-0" src={product.productImage} alt="..." />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder" style={{ textDecoration: 'none', color: 'rgb(36, 36, 36)' }}>
                {product.productName}
              </h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through"></span>
                <span>{`${product.price} Rs`}</span>
                <br />
                <span>{`${product.rating} Rating`}</span>
              </div>
              <p className="lead" style={{ textDecoration: 'none', color: 'black' }}>
                {product.description}
              </p>
              <div className="d-flex">
                <a href="">
                  <button className="btn btn-outline-dark flex-shrink-0 me-3" type="button"
                    onClick={handleBuyNow}
                  >
                    <i className="bi-cart-fill me-1"></i> Buy Now
                  </button>
                </a>
                <a>
                  <button
                    //   style={{ display: !removeCart ? 'block' : 'none' }}

                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                  >
                    Add to cart
                  </button>
                  <button
                    //   style={{ display: removeCart ? 'block' : 'none' }}

                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                  >
                    Remove from cart
                  </button>
                </a>
              </div>
              <div className="quantity-group mt-5">
                <button className="btn btn-outline-dark flex-shrink-0 me-3"onClick={increaseQuantity} >+</button>
                <input type="text" style={{ width: 30 }} className='me-3' value={quantity} />
                <button className="btn btn-outline-dark flex-shrink-0" onClick={decreaseQuantity} >-</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ViewProductPage
