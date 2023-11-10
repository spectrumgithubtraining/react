
import './App.css';
import { Route,Routes ,BrowserRouter} from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Layout from './components/Layout';


 // Import your Login component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          
           
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
      
        </Routes></BrowserRouter>
    
     
     
    </div>
  );
}

export default App;
