import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../../Footer';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';


const ProductPage = () => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState('');


  const [wishList,setWishList] = useState({})
  const navigate = useNavigate();

  

  useEffect(() => {
    fetchProducts();
    fetchWishlistItems()
  }, []);

  const fetchWishlistItems = async()=>{
    try{
      const response = await axios.get('http://localhost:5000/api/user/wishlist/view');
        const wishlistData = response.data.wishList;
        console.log(wishlistData)
        const updatedWishList = {};

        wishlistData.forEach((item)=>{
          updatedWishList[item.productId] = true;
        })
        setWishList(updatedWishList)


    }
    catch(err){
    console.error('err : ',err)

    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/Product/viewProduct');
      const { product } = response.data;
      setProducts(product);
      setFilteredProducts(product);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFilter = (category) => {
    setSearchKey(category);
    if (category) {
      const filtered = products.filter((product) => product.categoryId === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSearch = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };


  const handleToggleWishList = async (productId) => {
    try {
        const isLoggedIn = sessionStorage.getItem('token');
        if (!isLoggedIn) {
            navigate('/');
            return;
        }
        const decodedToken = jwtDecode(isLoggedIn);
        const userId = decodedToken.userId;

        const data = {
            userId: userId,
            productId: productId
        };
        let updatedWishList = { ...wishList };

        // Check if the product is in the wishlist
        if (wishList[productId]) {
            // If it is, remove it from the wishlist
            await axios.post('http://localhost:5000/api/user/wishlist/remove', data);
           delete updatedWishList[productId]
            toast.success("Item removed from wishlist");
        } else {
            // If it's not, add it to the wishlist
            await axios.post('http://localhost:5000/api/user/wishlist/add', data);
            updatedWishList[productId] = true;
            toast.success("Item added to wishlist");
        }
        setWishList(updatedWishList);
    } catch (err) {
        console.error('Error toggling wishlist:', err);
        toast.error("Failed to toggle wishlist");
    }
};

  
  return (
    <div>
 

      <Header onSearch={handleSearch} />
      
      <div className="container mt-5">
    
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.postimg.cc/jjXGKb2g/fashion-collection-design-shopping-graphic-words.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.postimg.cc/jjXGKb2g/fashion-collection-design-shopping-graphic-words.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.postimg.cc/jjXGKb2g/fashion-collection-design-shopping-graphic-words.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  
        <div className="row text-center">
          <div className="p-2 col-3">
            <button onClick={() => handleFilter('')} type="button" className="btn btn-light">
              <u>View all</u>
            </button>
          </div>
          <div className="p-2 col-3">
            <button onClick={() => handleFilter('2')} type="button" className="btn btn-light">
              <u>Men</u>
            </button>
          </div>
          <div className="p-2 col-3">
            <button onClick={() => handleFilter('3')} type="button" className="btn btn-light">
              <u>Women</u>
            </button>
          </div>
          <div className="p-2 col-3">
            <button onClick={() => handleFilter('1')} type="button" className="btn btn-light">
              <u>Footwear</u>
            </button>
          </div>
        </div>
      </div>

      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col mb-5">
                <div className="card h-100">
                  <img style={{height: '300px' }} className="card-img-top" src={product.productImage} alt="..." />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{product.productName}</h5>
                      {product.price}
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
      
                   <Link to={`/user/view/${product.id}`}>
                   <button className='btn btn-outline-dark mt-auto'>
                     View
                   </button>
                 </Link>
                 <span onClick={() => handleToggleWishList(product.id)}>
            {wishList[product.id] ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 512 512"  className="bi bi-heart mx-4">
                    <path fill="#ff0000" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" fill="none" stroke="black" className="bi bi-heart mx-4" viewBox="0 0 16 16">
                    <path fill="#0000" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            )}
        </span>

             
                      
                    </div>
        
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
    
  );
};

export default ProductPage;
