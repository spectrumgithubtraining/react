
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Button, Form, FormControl } from 'react-bootstrap';
import ViewOrderHistory from './ViewOrderHistory/ViewOrderHistory';
import ChangePassword from './ChangeUserPassword/ChangePassword';
import CircularProgress from '@mui/material/CircularProgress';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const [selectedOption, setSelectedOption] = useState('profile'); // Default to profile view
  const [userDetails, setUserDetails] = useState({});
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(null);

  const isLoggedIn = sessionStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
        try {
            const decodedToken = jwtDecode(isLoggedIn);
            const userId = decodedToken.userId;
            setUserId(userId);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
}, [isLoggedIn]);

useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/details/userDetails/${userId}`);
            console.log('response', response.data);
            const users = response.data;
            setUserDetails(users);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setLoading(false);
        }
    };

    if (userId) {
        fetchUserDetails();
    }
}, [userId]); // Add userId as a dependency

useEffect(() => {
    console.log('userDetails', userDetails);
}, [userDetails]); // Log userDetails when it changes
  const handleEdit = () => {
    setEditMode(true);
    setUpdatedDetails({ ...userDetails });
  };
  const handleLogout = () =>{
    sessionStorage.removeItem("token")
    navigate("/")
    window.location.reload()


  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
    console.log(updatedDetails)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/user/details/userDetails/${userId}`, updatedDetails);
      setUserDetails(updatedDetails);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
    window.location.reload();

  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderRightColumnContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (selectedOption === 'profile') {
      if (editMode) {
        return (
          <div>
            {userDetails.map((user, index) => (
              <Form key={index} onSubmit={handleSubmit}>
                <Form.Group controlId={`formFirstName_${index}`}>
                  <Form.Label>First Name</Form.Label>
                  <FormControl
                    type="text"
                    name="firstname"
                    placeholder={user.firstname }
                    onChange={(e) => handleInputChange(e, index)} // Pass the index to handleInputChange
                  />
                </Form.Group>
                <Form.Group controlId={`formLastName_${index}`}>
                  <Form.Label>Last Name</Form.Label>
                  <FormControl
                    type="text"
                    name="lastname"
                    placeholder={user.lastname }
                    onChange={(e) => handleInputChange(e, index)} // Pass the index to handleInputChange
                  />
                </Form.Group>
                <Form.Group controlId={`formEmail_${index}`}>
                  <Form.Label>Email</Form.Label>
                  <FormControl
                    type="email"
                    name="email"
                    placeholder={user.email }
                    onChange={(e) => handleInputChange(e, index)} // Pass the index to handleInputChange
                  />
                </Form.Group >
                <Button variant="dark" type="submit">Save</Button>
              </Form>
            ))}
          </div>
        );
        
      }

      return (
        <Card className="mt-5">
        <Card.Body>
          {loading ? (
            <CircularProgress /> // Display a loading indicator while data is being fetched
          ) : userDetails.length > 0 ? ( // Check if userDetails array is not empty
            <div>
              {userDetails.map((user, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.firstname} {user.lastname}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Age</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.age}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <Button variant="dark" onClick={handleEdit}>Edit</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No user details available</p> // Render a message if userDetails is empty
          )}
        </Card.Body>
      </Card>
      );
    } else if (selectedOption === 'changePassword') {
      return <ChangePassword />;
    } else if (selectedOption === 'orderHistory') {
      return <ViewOrderHistory/>;
    } else {
      return null;
    }
  };

  return (
    <Container>
      <div className="main-body mt-5">
        <Row className="gutters-sm">
          <Col md={4} className="mt-3">
          <Card>
  <Card.Body>
    {loading ? (
      <CircularProgress /> // Display a loading indicator while data is being fetched
    ) : userDetails.length > 0 ? ( // Check if userDetails array is not empty
      <div className="d-flex flex-column align-items-center text-center">
   
        <div className="mt-3">
          <h4>{userDetails[0].firstname} {userDetails[0].lastname}</h4>
          <p className="text-secondary mb-1">Email: {userDetails[0].email}</p>
          <p className="text-secondary mb-1">Age:   {userDetails[0].age}</p>
        </div>
      </div>
    ) : (
      <p>No user details available</p> // Render a message if userDetails is empty
    )}
  </Card.Body>
</Card>

            <Card className="mt-5">
              <ul className="list-group list-group-flush">
              <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  onClick={()=> navigate("/")}
                >
                  <h6 className="mb-0"><i className="feather feather-github mr-2 icon-inline"></i><b>Home</b></h6>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  onClick={() => handleOptionChange('changePassword')}
                >
                  <h6 className="mb-0"><i className="feather feather-globe mr-2 icon-inline"></i>Change password</h6>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  onClick={() => handleOptionChange('orderHistory')}
                >
                  <h6 className="mb-0"><i className="feather feather-github mr-2 icon-inline"></i>View order History</h6>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  onClick={() => handleOptionChange('profile')}
                >
                  <h6 className="mb-0"><i className="feather feather-globe mr-2 icon-inline"></i>User Profile</h6>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  onClick={()=>handleLogout()}
                >
                  <h6 className="mb-0"><i className="feather feather-github mr-2 icon-inline"></i>Logout</h6>
                </li>
             
                {/* Add more list items for other options if needed */}
              </ul>
            </Card>
          </Col>
          <Col md={8}>
            {renderRightColumnContent()}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default UserProfile;

