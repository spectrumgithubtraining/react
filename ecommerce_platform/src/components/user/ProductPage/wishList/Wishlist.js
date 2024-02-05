import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Header from '../../../Header';
import Footer from '../../../Footer';


function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const fetchWishlistData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/wishlist/view');
      const wishlistData = response.data.wishList;
      console.log(wishlistData)

      // Fetch details for each product in the wishlist
      const productPromises = wishlistData.map(async (wishlistItem) => {
        console.log("wishlistData",wishlistItem)
        const productResponse = await axios.get(`http://localhost:5000/api/admin/Product/viewProduct/${wishlistItem.productId}`);
       console.log(productResponse.data)
        return productResponse.data;

      });

      // Wait for all product details requests to complete
      const products = await Promise.all(productPromises);
      console.log("sadasda",products)
      setWishlistItems(products);
      console.log("wishlistItems",wishlistItems)

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
   
    fetchWishlistData();
  }, []);
  const handleRemove = async (productId) => {
    try {
      const isLoggedIn = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(isLoggedIn);
      const userId = decodedToken.userId;
      
      const data = {
        userId: userId,
        productId: productId
      };

      await axios.post('http://localhost:5000/api/user/wishlist/remove', data);
      setWishlistItems(prevItems => prevItems.filter(item => item.productId !== productId));
      window.location.reload()

      toast.success("Removed")
    }
    
    catch (err) {
      console.error("Error removing the product:", err);
    }
  };

  return (
    <section className="pt-5 pb-5">
      <Header></Header>
      <div className="container mt-5">
        <div className="row w-100">
          <div className="col-lg-12 col-md-12 col-12">
            <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
            <p className="mb-5 text-center">
              <i className="text-success font-weight-bold">{wishlistItems.length}</i> items in your cart
            </p>
            <table id="shoppingCart" className="table table-condensed table-responsive">
              <thead>
                <tr>
                  <th style={{ width: '60%' }}>Product</th>
                  <th style={{ width: '12%' }}>Price</th>
                  <th style={{ width: '16%' }}></th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item, index) => (
                  <tr key={index}>

                    <td data-th="Product">
                      <div className="row">
                        <div className="col-md-3 text-left">
                        <Button variant="link"onClick={()=>{handleRemove(item.product.id)}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
      </svg>
    </Button>
                          <img
                            src={item.product.productImage} // assuming your item object has an 'image' property
                            alt={item.product.productName} // assuming your item object has a 'name' property
                            className="img-fluid d-none d-md-block rounded mb-2 shadow"
                          />
                        </div>
                        <div className="col-md-9 text-left mt-sm-2">
                          <h4>{item.product.productName}</h4>
                          <p className="font-weight-light">{item.product.productName}</p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">{item.product.price} Rs </td>
                    <td className="actions" data-th="">
                      <div className="text-right">
                      
                   <Link to={`/user/view/${item.product.id}`}>
                   <button className='btn btn-outline-dark mt-auto'>
                     purchase
                   </button>
                 </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="float-right text-right mb-5">
              <h4>Subtotal:</h4>
              {/* Calculate subtotal dynamically */}
              <h1>${wishlistItems.reduce((acc, item) => acc + item.product.price, 0)}</h1>
            </div>
          </div>
        </div>
      </div>
 
    </section>
  );
}

export default Wishlist;
