
import { React, useState } from 'react'
import axios from 'axios';
import './Login.css'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validateEmail = () => {

    return email.includes('@');
  };

  const validatePassword = () => {

    return password.length >= 8;
  };

  const validateFields = () => {
    return (
      validateEmail() &&
      validatePassword()

    );
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      alert('Invalid input. Please check your details.');
      return;
    }
    else {
      try {
        const response = await axios.post('http://localhost:5000/api/user/login/login', { email, password })
        if (response) {
          alert("login success")
        }
        else {
          alert(response.message)
        }

      } catch (error) {
        alert("error", error)
      }
    };
  }

  return (
    

    <Container className="login-container mt-5">
      <Row className='row-card'>
        <Col md={6} className="d-none d-md-block">
          <Card className='my-2'>
            <Card.Img
              src=""
              alt="login form"
              fluid
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mt-5" style={{ border: "none" }}>
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


              <Button variant="primary" type="submit" className="mt-3">
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
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

export default Login

