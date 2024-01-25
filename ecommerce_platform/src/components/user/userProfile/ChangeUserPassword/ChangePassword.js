import React, { useState,useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';


const ChangePassword = () => {
  const [email, setEmail] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

useEffect(()=>{
  const token = sessionStorage.getItem('token')
  if(token){
    const decodedToken = jwtDecode(token);
    const emailid = decodedToken.email
    console.log(emailid)
    setEmail(emailid)
  }

},[])

 

  const handleCaptchaChange = (value) => {
    // Handle Google reCAPTCHA verification
    setRecaptchaToken(value);
    setIsCaptchaVerified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the Google reCAPTCHA is verified
    if (!isCaptchaVerified) {
      alert('Please verify the reCAPTCHA.');
      return;
    }

    try {
      // Send data to the backend using axios
      const response = await axios.post('http://localhost:5000/api/user/details/submit', {
        email,
        newPassword,
        recaptchaToken,
      });

      // Handle success response
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
    }

    // Clear the form fields after submission
    setEmail('');
  
    setNewPassword('');
    setIsCaptchaVerified(false);
    setRecaptchaToken('');
  };
    return (
        <Card>
            <Card.Body>
                <Card.Title>Change Password Section</Card.Title>
                <Form onSubmit={handleSubmit}>
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
                                value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                                className='custom-input'
                            />
                            <label className='mt-3' htmlFor="New password">new  password</label>
                        </div>

                    </Form.Group>

                    <div className='mt-5'style={{paddingLeft:"200px"}}>
                        {/* Google reCAPTCHA */}
                        <ReCAPTCHA sitekey="6LfhlVkpAAAAAEaHAkkIr8eGtbUPzMsvquFczDJj" onChange={handleCaptchaChange} />
                    </div>
                    <br />
                    <Button variant="dark" type="submit">
                        Change Password
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ChangePassword;
