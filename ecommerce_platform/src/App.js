
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';

import SellerDashboard from './components/SellerDashboard';
import Layout from './components/Layout';
import Add from './components/seller/Add';
import Edit from './components/seller/Edit';
import View from './components/seller/View';
import SellerSidebar from './components/seller/SellerSidebar';



// Import your Login component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>


          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path='/sellerdashboard' element={<SellerDashboard />} />
          <Route path='/addProduct' element={<Add />} />
          <Route path="/sellerdashboard/edit/:productId" element={<Edit />} />
          <Route path="/sellerdashboard/view/:productId" element={<View />} />
          <Route path="/dashboard" element={<SellerSidebar />} />



        </Routes></BrowserRouter>



    </div>
  );
}

export default App;
