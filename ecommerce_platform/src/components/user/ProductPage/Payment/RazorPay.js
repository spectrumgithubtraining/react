// import React, { useState } from 'react';
// import axios from 'axios';


// const RazorPay = () => {
//     function loadScript(src) {
//         return new Promise((resolve) => {
//           const script = document.createElement('script');
//           script.src = src;
//           script.onload = () => {
//             resolve(true);
//           };
//           script.onerror = () => {
//             resolve(false);
//           };
//           document.body.appendChild(script);
//         });
//       }
    
//       async function displayRazorpay() {
//         const res = await loadScript(
//           'https://checkout.razorpay.com/v1/checkout.js'
//         );
    
//         if (!res) {
//           alert('Razorpay SDK failed to load. Are you online?');
//           return;
//         }
    
//         const result = await axios.post('http://localhost:5000/razorpay/orders');
    
//         if (!result) {
//           alert('Server error. Are you online?');
//           return;
//         }
    
//         const { amount, id: order_id, currency } = result.data;
    
//         const options = {
//           key: 'rzp_test_WWwrDz9JvKdEWN', // Enter the Key ID generated from the Dashboard
//           amount: amount.toString(),
//           currency: currency,
//           name: 'Soumya Corp.',
//           description: 'Test Transaction',
        
//           order_id: order_id,
//           handler: async function (response) {
//             const data = {
//               orderCreationId: order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpayOrderId: response.razorpay_order_id,
//               razorpaySignature: response.razorpay_signature,
//             };
    
//             const result = await axios.post('http://localhost:5000/razorpay/success', data);
    
//             alert(result.data.msg);
//           },
//           prefill: {
//             name: '<YOUR NAME>',
//             email: 'example@example.com',
//             contact: '9999999999',
//           },
//           notes: {
//             address: 'Example Corporate Office',
//           },
//           theme: {
//             color: '#61dafb',
//           },
//         };
    
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//       }
    
//       return (
//         <div className='App'>
//           <header className='App-header'>
   
//             <p>Buy React now!</p>
//             <button className='App-link' onClick={displayRazorpay}>
//               Pay ₹500
//             </button>
//           </header>
//         </div>
//       );
// };

// export default RazorPay;

// import React, { useEffect, useRef,useState } from 'react';
// import axios from 'axios';


// const RazorPay = ({ totalPrice, orderId, userId, onSuccess, onCancel }) => {
//   const [userData, setUserData] = useState({});
//   const razorpayRef = useRef();
//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`http://api/user/details/details/${userId}`);
//       setUserData(response.data);
//       console.log("userdat",userData)
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };
//    useEffect(() => {
   

//     fetchUserData();
//   }, [userId]);

//   const loadRazorpay = async () => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     document.body.appendChild(script);

//     script.onload = () => {
//       const options = {
//         key: 'rzp_test_WWwrDz9JvKdEWN', // Replace with your Razorpay API key
//         amount: totalPrice * 100, // Razorpay accepts amount in paise
//         currency: 'INR',
//         name: 'J$L',
//         description: 'Payment for Order #' + orderId,
//         image: 'https://your-store-logo-url.com/logo.png', // Replace with your store logo URL
//         order_id: "",
//         handler: function (response) {
//           onSuccess(response);
//         },
//         prefill: {
//           name: 'John Doe', // Replace with the user's name
//           email: 'john.doe@example.com', // Replace with the user's email
//           contact: '9876543210', // Replace with the user's contact number
//         },
//         notes: {
//           userId: userId,
//         },
//         theme: {
//           color: 'blue', // Replace with your desired theme color
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     };
//   };


//   useEffect(() => {
    
//     loadRazorpay();
//   }, [totalPrice, orderId, userId, onSuccess, onCancel]);

//   return (
//     <div>
//       <div ref={razorpayRef}></div>
//     </div>
//   );
// };

// export default RazorPay;

// RazorPay.js

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

// const RazorPay = ({ totalPrice, orderId, userId, onSuccess, onCancel }) => {
//   const [userData, setUserData] = useState({});
//   const razorpayRef = useRef();

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/razorpay/details/${userId}`);
//       setUserData(response.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, [userId]);

//   const loadRazorpay = async () => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     document.body.appendChild(script);

//     script.onload = () => {
//       // Make API request to get order details from your backend
//       axios.post(`http://localhost:3001/api/order/${userId}/${totalPrice}/${orderId}`)
//         .then(response => {
//           const options = {
//             key: 'your_razorpay_key_id',
//             amount: response.data.options.amount,
//             currency: response.data.options.currency,
//             name: response.data.options.name,
//             description: response.data.options.description,
//             image: response.data.options.image,
//             order_id: response.data.orderId,
//             handler: function (response) {
//               onSuccess(response);
//             },
//             prefill: response.data.options.prefill,
//             notes: response.data.options.notes,
//             theme: response.data.options.theme,
//           };

//           const razorpay = new window.Razorpay(options);
//           razorpay.open();
//         })
//         .catch(error => {
//           console.error('Error getting Razorpay order:', error);
//         });
//     };
//   };

//   useEffect(() => {
//     loadRazorpay();
//   }, [totalPrice, orderId, userId, onSuccess, onCancel]);

//   return (
//     <div>
//       <div ref={razorpayRef}></div>
//     </div>
//   );
// };

// export default RazorPay;


// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

// const RazorPay = ({ totalPrice, orderId, userId, onSuccess, onCancel }) => {

//   return(
//     <div></div>
//   )
// }

// export default RazorPay
// import React from 'react'
// import axios from "axios";
// import { useState } from "react";

// function RazorPay({totalPrice,orderId,userID,onSuccess,onCancel}) {
//     // const [book, setBook] = useState({
// 	// 	name: "The Fault In Our Stars",
// 	// 	author: "John Green",
// 	// 	img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
// 	// 	price: 250,
// 	// });

// 	const initPayment = (data) => {
// 		const options = {
// 			key: "YOUR_RAZORPAY_KEY",
// 			amount: data.amount,
// 			currency: data.currency,
// 			name: book.name,
// 			description: "Test Transaction",
// 			image: book.img,
// 			order_id: data.id,
// 			handler: async (response) => {
// 				try {
// 					const verifyUrl = "http://localhost:5000/razorpay/verify";
// 					const { data } = await axios.post(verifyUrl, response);
// 					console.log(data);
// 				} catch (error) {
// 					console.log(error);
// 				}
// 			},
// 			theme: {
// 				color: "#3399cc",
// 			},
// 		};
// 		const rzp1 = new window.Razorpay(options);
// 		rzp1.open();
// 	};

// 	const handlePayment = async () => {
// 		try {
// 			const orderUrl = "http://localhost:5000/razorpay/orders";
// 			const { data } = await axios.post(orderUrl, { amount: book.price });
// 			console.log(data);
// 			initPayment(data.data);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	return (
// 		<div className="App">
// 			<div className="book_container">
// 				<img src={book.img} alt="book_img" className="book_img" />
// 				<p className="book_name">{book.name}</p>
// 				<p className="book_author">By {book.author}</p>
// 				<p className="book_price">
// 					Price : <span>&#x20B9; {book.price}</span>
// 				</p>
// 				<button onClick={handlePayment} className="buy_btn">
// 					buy now
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

// export default RazorPay
