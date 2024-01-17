
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
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

import { ProductProvider } from './components/context/ProductContext';
import CheckOut from './components/user/ProductPage/checkOutPage/CheckOut';
import Payment from './components/user/ProductPage/Payment/Payment';
import RazorPay from './components/user/ProductPage/Payment/RazorPay';



// Import your Login component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ProductProvider>
          <Routes>
            < Route path="/" element={<Productpage />} />
            {/* < Route path="/checkOutPage/:productId " element={<CheckOutPage />} /> */}
            <Route path='/checkOutPage' element={<CheckOut/>} />
            <Route path="/user/view/:productId" element={<ViewProductPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path='/sellerdashboard' element={<SellerDashboard />} />
            <Route path='/addProduct' element={<Add />} />
            <Route path="/sellerdashboard/edit/:productId" element={<Edit />} />
            <Route path="/sellerdashboard/view/:productId" element={<View />} />
            <Route path="/dashboard" element={<SellerSidebar />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/razorpay" element={<RazorPay />} />
          </Routes>
        </ProductProvider>

      </BrowserRouter>



    </div>
  );
}

export default App;
