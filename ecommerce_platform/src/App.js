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

const PrivateRoute = ({ element, authenticated }) => {
  return authenticated ? element : <Navigate to="/login" />;
};

const App = () => {

  
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('token');
  
    // Check if the token exists before attempting to decode
    if (isLoggedIn) {
      try {
        const decodedToken = jwtDecode(isLoggedIn);
        const userType = decodedToken.userType;
        setUserType(userType);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    else{
      redirectToLogin()
    }
  }, []);

  const redirectToLogin = () => <Route path="/login" element={<Login />} />;

  const userRoutes = (
    <>
      <Route path="/user/view/:productId" element={<ViewProductPage />} />
      <Route path="/user/userProfile" element={<UserProfile />} />
      <Route path="/checkOutPage" element={<CheckOut />} />
      <Route path="/payment" element={<PrivateRoute element={<Payment />} authenticated={userType === 'user'} />} />
      <Route path="/razorpay" element={<PrivateRoute element={<RazorPay />} authenticated={userType === 'user'} />} />
    </>
  );

  const sellerRoutes = (
    <>
      <Route path="/sellerdashboard" element={<SellerDashboard />} />
      <Route path="/addProduct" element={<Add />} />
      <Route path="/sellerdashboard/edit/:productId" element={<Edit />} />
      <Route path="/sellerdashboard/view/:productId" element={<View />} />
      <Route path="/dashboard" element={<SellerSidebar />} />
    </>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Productpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="registration" element={<Registration />} />

          {userType === 'user' && userRoutes}
          {userType === 'seller' && sellerRoutes}

          <Route path="/*" element={redirectToLogin} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
