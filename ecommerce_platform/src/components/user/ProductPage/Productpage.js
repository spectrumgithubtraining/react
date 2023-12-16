import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import { Link } from 'react-router-dom';


const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

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

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="container">
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
                  <img style={{ height: '300px' }} className="card-img-top" src={product.productImage} alt="..." />
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
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
