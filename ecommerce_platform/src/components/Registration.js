import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'jquery-ui/ui/widgets/datepicker'; // Import datepicker module
import 'jquery-ui/themes/base/all.css';
import { Link } from 'react-router-dom';
import './Registration.css';
import $ from 'jquery';
import axios from 'axios';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    // Initialize datepicker
    $('#dob').datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: '1900:2023',
      dateFormat: 'yy-mm-dd',
      onSelect: (date) => handleDateSelect(date),
    });
  }, []);

  const validateEmail = () => {
   
    return email.includes('@');
  };

  const validatePassword = () => {
    // Implement your password validation logic here
    // For example, require at least 8 characters
    return password.length >= 8;
  };

  const validateName = (name) => {
    // Validate that the name contains only letters
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
  };

  const validateFields = () => {
    return (
      validateEmail() &&
      validatePassword() &&
      validateName(firstname) &&
      validateName(lastname)
    );
  };

  const handleDateSelect = (dateText) => {
    // Calculate age based on the selected date
    const birthDate = new Date(dateText);
    const currentDate = new Date();
    const ageDiff = currentDate.getFullYear() - birthDate.getFullYear();

    if (ageDiff < 9 || ageDiff === 0) {
      setWarning('Age must be at least 9 years.');
      setAge('');
      alert(warning)
    } else {
      setWarning('');
      setAge(ageDiff);
    }

    // Check if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      setAge(ageDiff - 1);
    } else {
      setAge(ageDiff);
    }

    setDob(dateText);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      alert('Invalid input. Please check your details.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/register/register', {
        email,
        password,
        userType,
        dob,
        age,
        firstname,
        lastname,
      });

      if (response.status === 200) {
        // Registration successful
        alert('Registration successful!');
      } else if (response.status === 400) {
        // Registration failed due to duplicate email
        alert('Email already in use. Please choose another email.');
      } else {
        // Registration failed for other reasons
        alert('Registration failed. Please try again later.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <Container className="login-container mt-5">
      <Row className="row-card">
        <Col md={6} className="d-none d-md-block">
          <Card className="my-2">
            <Card.Img src="https://i.postimg.cc/YSkZcgy1/portrait-young-japanese-woman-with-jacket.jpg" alt="Registration form" fluid />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mt-5" style={{ border: 'none' }}>
            <Form className="mt-5" onSubmit={handleRegister}>
              <div className="p-1 py-5 text-center">
                <h2>Registration </h2>
                <h6 style={{ color: 'gray' }}>
                  <b>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</b>
                </h6>
              </div>

              <Form.Group className="mb-3 mx-5">
                <div className="inputbox1">
                  <Form.Control
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="custom-input"
                  />
                  <label className="mt-3">First name</label>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 mx-5">
                <div className="inputbox1">
                  <Form.Control
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="custom-input"
                  />
                  <label className="mt-3">Last name</label>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 mx-5">
                <div className="inputbox1">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="custom-input"
                  />
                  <label className="mt-3" htmlFor="email">
                    Email
                  </label>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 mx-5">
                <div className="inputbox1">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input"
                  />
                  <label className="mt-3" htmlFor="password">
                    Password
                  </label>
                </div>
              </Form.Group>
              <div className=" Dob">
                
                <input
                  type="text"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  onBlur={() => handleDateSelect(dob)}
                />
                 
                 <label className="mt-3 " id='dob-label' htmlFor="DOB">
                    date
                  </label>
                
              </div>

              <div className='mt-4'>
              <label htmlFor="sellerRadio">Seller</label>
                <input
                
                  type="radio"
                  value="seller"
                  checked={userType === 'seller'}
                  onChange={() => setUserType('seller')}
                  id="sellerRadio"
                  className='radio-seller'
                  placeholder='seller'
                />
              
              </div>

              <Button variant="primary" type="submit" className="mt-3">
                Register
              </Button>
              <div className="mt-3">
                <span>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                    Login
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

export default Registration;
