import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import SellerDashboard from './components/seller/SellerDashboard';
import Layout from './components/Layout';
import Add from './components/seller/Add';
import Edit from './components/seller/Edit';
import View from './components/seller/View';
import SellerSidebar from './components/seller/SellerSidebar';
import Productpage from './components/user/ProductPage/Productpage';
import { Carousel } from 'react-bootstrap';
import ViewProductPage from './components/user/ProductPage/ViewProductPage/ViewProductPage';
import CheckOut from './components/user/ProductPage/checkOutPage/CheckOut';
import Payment from './components/user/ProductPage/Payment/Payment';
import RazorPay from './components/user/ProductPage/Payment/RazorPay';
import UserProfile from './components/user/userProfile/UserProfile';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import ToastContainer CSS
import Wishlist from './components/user/ProductPage/wishList/Wishlist';
import LandingPage from './components/landingpage/LandingPage';

const PrivateRoute = ({ element, authenticated }) => {
  return authenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [userType, setUserType] = useState(null);
  const isLoggedIn = sessionStorage.getItem('token');
 const isloggedIn = ()=>{
  const isLoggedIn = sessionStorage.getItem('token');
  
  if (isLoggedIn) {
    try {
      const decodedToken = jwtDecode(isLoggedIn);
      const userType = decodedToken.userType;
      setUserType(userType);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    setUserType(null); // Reset user type if not logged in
  }
 }
  useEffect(() => {
    isloggedIn()
    const isLoggedIn = sessionStorage.getItem('token');
  
    if (isLoggedIn) {
      try {
        const decodedToken = jwtDecode(isLoggedIn);
        const userType = decodedToken.userType;
        setUserType(userType);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      setUserType(null); // Reset user type if not logged in
    }
  }, [isLoggedIn]);

  const redirectToLogin = () => <Navigate to="/login" />;

  // const userRoutes = (
  //   <>
  //     <Route path="/user/view/:productId" element={<ViewProductPage />} />
  //     <Route path="/user/userProfile" element={<UserProfile />} />
  //     <Route path="/checkOutPage" element={<CheckOut />} />
  //     <Route path="/payment" element={<PrivateRoute element={<Payment />} authenticated={userType === 'user'} />} />
  //     <Route path="/razorpay" element={<PrivateRoute element={<RazorPay />} authenticated={userType === 'user'} />} />
  //   </>
  // );

  // const sellerRoutes = (
  //   <>
  //     <Route path="/sellerdashboard" element={<SellerDashboard />} />
  //     <Route path="/addProduct" element={<Add />} />
  //     <Route path="/sellerdashboard/edit/:productId" element={<Edit />} />
  //     <Route path="/sellerdashboard/view/:productId" element={<View />} />
  //     <Route path="/dashboard" element={<SellerSidebar />} />
  //   </>
  // );

  return (
    <div className="App">
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/productPage" element={<Productpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/" element={<LandingPage />} />

        {userType === 'user' && (
          <>
            <Route path="/user/view/:productId" element={<ViewProductPage />} />
            <Route path="/user/userProfile" element={<UserProfile />} />
            <Route path="/checkOutPage" element={<CheckOut />} />
            <Route path="/payment" element={<PrivateRoute element={<Payment />} authenticated={userType === 'user'} />} />
            <Route path="/razorpay" element={<PrivateRoute element={<RazorPay />} authenticated={userType === 'user'} />} />
          </>
        )}

        {userType === 'seller' && (
          
          <>
            <Route path="/sellerdashboard" element={<SellerDashboard />} />
            <Route path="/addProduct" element={<Add />} />
            <Route path="/sellerdashboard/edit/:productId" element={<Edit />} />
            <Route path="/sellerdashboard/view/:productId" element={<View />} />
            <Route path="/dashboard" element={<SellerSidebar />} />
          </>
        )}
         {userType === null && (
          <>
           <Route path="*" element={<Login />} />
          </>
        )}
        

        
      </Routes>
    </BrowserRouter>
  </div>
);
};


export default App;
