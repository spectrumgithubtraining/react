import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link  } from 'react-router-dom';

function Header({ onSearch }) {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartQuantity, setCartQuantity] = useState(0);


  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/admin/Product/viewProduct');
      setAllProducts(result.data.product);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

  }, []);

  const handleSearch = () => {
    const filteredProducts = allProducts.filter(
      (product) =>
        product && product.productName && product.productName.toLowerCase().includes((searchTerm || '').toLowerCase())
    );
    onSearch(filteredProducts);
  };
  useEffect(()=>{
    updateCartQuantity()
   

  },[])
  const updateCartQuantity = () => {
    const isLoggedIn = sessionStorage.getItem('token');
  
    // Check if the token exists before attempting to decode
    if (isLoggedIn) {
      try {
        const decodedToken = jwtDecode(isLoggedIn);
        const userId = decodedToken.userId;
  
        const cartCookie = Cookies.get(userId) || '{}';
        const parsedCartCookie = JSON.parse(cartCookie);
        // Assuming the cart structure has a 'quantity' property
        const totalQuantity = Object.values(parsedCartCookie).reduce((total, item) => total + item.quantity, 0);
        setCartQuantity(totalQuantity);
      
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    
    } else {
      // Handle the case when the user is not logged in
      console.log('User is not logged in');
    }
  };
      useEffect(()=>{
        updateCartQuantity()
       
    
      },[cartQuantity])
 
  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-light fixed-top"  style={{ backgroundColor: '#3d5027',color:'white' }}>
    <div className="container-fluid">
      <a className="navbar-brand mx-4" style={{color:'white'}} href="/">J$L</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link active"  style={{color:'white'}} href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  style={{color:'white'}} href="#">About us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  style={{color:'white'}} href="#">Contact us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  style={{color:'white'}} href="/user/userProfile">User</a>
          </li>
          <li className="nav-item">
            <Link to={'/checkOutPage'}>
              <button className="btn btn-outline-light" type="submit">
                <i className="bi bi-cart-fill me-"></i>
                Cart
                <span className="badge bg-light text-black ms-1 rounded-pill">{cartQuantity}</span>
              </button>
            </Link>
          </li>
        </ul>
        <form className="d-flex">
          <input className='mx-3' style={{width:"300px"}} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button type='button' className="btn btn-light" onClick={handleSearch}>Search</button>
        </form>
      </div>
    </div>
  </nav>


</div>

  )
}

export default Header;