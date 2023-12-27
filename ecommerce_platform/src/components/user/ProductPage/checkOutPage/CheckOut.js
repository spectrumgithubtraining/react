// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';


// const CheckOut = () => {
//     const [userData, setUserData] = useState({ email: '', address: '', contact: '' });
//     const { productId } = useParams();
//     const [product, setProduct] = useState('');

//     // Fetch product data
//     const fetchProduct = async () => {
//         try {
//             const result = await axios.get(`http://localhost:5000/api/admin/Cart/viewCart/${productId}`);
//             setProduct(result.data.productCart); // Assuming the response has a 'productCart' field
//             console.log(product)
//         } catch (error) {
//             console.error('Error fetching product:', error);
//         }
//     };

//     useEffect(() => {
//         fetchProduct();
//     }, [productId]);

//     // Assuming productData contains quantity information
//     const { quantity } = product.;

//     // Calculate total price based on quantity
//     const totalPrice = product && quantity ? product.price * quantity : 0;

//     const handleInputChange = (e) => {
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//     };

//     const handlePlaceOrder = () => {
//         // Add logic to place the order and update any necessary data
//         // For simplicity, just log the order details in this example
//         console.log('Placing order:', {
//             product,
//             userData,
//             totalPrice,
//         });
//     };

//     return (
//         <div className="container mt-5">
//             <h1 className="mb-4">Checkout</h1>
//             {product && (
//                 <div className="row">
//                     <div className="col-md-6">
//                         {/* Product Information */}
//                         <div className="card mb-4">
//                             <div className="card-body">
//                                 <h5 className="card-title">{product.productName}</h5>
//                                 <p className="card-text">Price: {product.price} $</p>
//                                 {/* Add more product details as needed */}
//                             </div>
//                         </div>

//                         {/* User Information Form */}
//                         <form>
//                             <div className="mb-3">
//                                 <label htmlFor="email" className="form-label">Email</label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     id="email"
//                                     name="email"
//                                     value={userData.email}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="address" className="form-label">Address</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="address"
//                                     name="address"
//                                     value={userData.address}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="contact" className="form-label">Contact</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="contact"
//                                     name="contact"
//                                     value={userData.contact}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>

//                             {/* Add more form fields as needed */}
//                         </form>
//                     </div>

//                     <div className="col-md-6">
//                         {/* Order Summary */}
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">Order Summary</h5>
//                                 <p className="card-text">Product: {product.productName}</p>
//                                 <p className="card-text">Total Price: {totalPrice} $</p>
//                                 {/* Add more order details as needed */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {/* Place Order Button */}
//             <div className="mt-4">
//                 <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
//             </div>
//         </div>
//     );
// };

// export default CheckOut;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CheckOut() {
    const { productId } = useParams();
    const [cproduct, setCproduct] = useState('');
    const [product,setProduct] = useState('')


    const fetchData = async ()=>{
        const result = await axios.get(`http://localhost:5000/api/admin/Cart/viewCart/${productId}`)
    
        setCproduct(result.data.productCart)
       
    }

    const fetchProductData = async ()=>{
      const result = await axios.get(`http://localhost:5000/api/admin/Product/viewProduct/${productId}`)
      console.log("productData",result)
      setProduct(result.data.product)
      
    }
    useEffect(()=>{
      fetchData()
      fetchProductData()
    },[productId])

    const {quantity} = cproduct
    const totalPrice = product && quantity ? product.price * quantity : 0;
    

    const handlePlaceOrder=()=>
    {
      alert("processing")
    }


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
                                        // value={userData.email}
                                        // onChange={handleInputChange}
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
                                        // value={userData.address}
                                        // onChange={handleInputChange}
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
                                        // value={userData.contact}
                                        // onChange={handleInputChange}
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
  )
}

export default CheckOut
