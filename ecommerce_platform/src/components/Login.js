import { useNavigate } from 'react-router-dom';
import { React, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = () => {
    return email.includes('@');
  };

  const validatePassword = () => {
    return password.length >= 8;
  };

  const validateFields = () => {
    return validateEmail() && validatePassword();
  };

  
const handleLogin = async () => {
  try {
    const BuyProductId = sessionStorage.getItem('BuyProductId');

    // Continue with your existing login logic
    const response = await axios.post('http://localhost:5000/api/user/login/login', { email, password });

    if (response.data) {
      const token = response.data.token;
      console.log("token:", token);
      
      // Store the token in sessionStorage
      sessionStorage.setItem('token', token);

      // Redirect to the respective page with parameters
      if (BuyProductId) {
        // Clear the BuyProductId from sessionStorage after using it
       
        
        // Redirect to the product page with the BuyProductId
        navigate(`/user/view/${BuyProductId}`);
      } else {
        const { userType, redirect } = response.data;
        if (userType === 'user' || userType === 'seller') {
          navigate(redirect);
        } else {
          alert('Invalid user type');
        }
      }
    } else {
      alert('Invalid response format');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error during login');
  }
};

  const responseGoogle = async (response) => {
    try {

      // console.log(response)
      const { credential } = response;
      // console.log(credential);
      const payload = JSON.parse(atob(credential.split('.')[1]));


      const email = payload.email;
      const firstName = payload.given_name; // Update this line
      const lastName = payload.family_name; // Update this line
      const googleId = payload.sub
      const tokenId = credential;



      const googleResponse = await axios.post('http://localhost:5000/api/user/login/google', {
        email,
        firstName,
        lastName,
        tokenId,
        googleId


      })
      if (googleResponse.data) {
        const { userType, redirect } = googleResponse.data;

        if (userType === 'user') {


          navigate(redirect);
        } else {
          alert('Invalid user type');
        }
      } else {
        alert('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('response', error.response.data);
      }
      alert('google login error')
    }
  };


  return (
    <Container className="login-container mt-5">
      <Row className="row-card">
        <Col md={6} className="d-none d-md-block">
          <Card className="my-2">
            <Card.Img src="https://i.postimg.cc/zXSjRMf1/view-hawaiian-shirt-with-floral-print-leaf.jpg" alt="login form" fluid />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mt-5" style={{ border: 'none' }}>
            <Form className="mt-5" onSubmit={handleLogin}>
              <div className="p-1 py-5 text-center">
                <h2>Login Form</h2>
                <h6 style={{ color: 'gray' }}>
                  <b>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</b>
                </h6>
              </div>
              <Form.Group className="mb-3 mx-5">

                <div className="inputbox1">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='custom-input'

                  />
                  <label className='mt-3' htmlFor="email">Email</label>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 mx-5">

                <div className="inputbox1">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='custom-input'
                  />
                  <label className='mt-3' htmlFor="password">password</label>
                </div>

              </Form.Group>


              <Button variant="primary" type="button" className="mt-3" onClick={handleLogin}>
                Login
              </Button>
              <div className="mt-3">
                <span>
                  Don't have an account?{' '}
                  <Link to="/registration" style={{ color: 'black', textDecoration: 'none' }}>
                    Create New Account
                  </Link>
                </span>
              </div>

            </Form>
            <div className="mt-3">
              <button><GoogleLogin onSuccess={responseGoogle}>Login with Google
              </GoogleLogin></button>

            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
