import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import ViewOrderHistory from './ViewOrderHistory/ViewOrderHistory';
import ChangePassword from './ChangeUserPassword/ChangePassword';

const UserProfile = () => {
  const [selectedOption, setSelectedOption] = useState('profile'); // Default to profile view

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderRightColumnContent = () => {
    if (selectedOption === 'profile') {
      return (
        <Card className="mt-5">
          <Card.Body>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Full Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                Kenneth Valdez
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                fip@jukmuh.al
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
                <Button variant="dark" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      );
    } else if (selectedOption === 'changePassword') {
         return <ChangePassword />;
    
    } else if (selectedOption === 'orderHistory') {
      return <ViewOrderHistory/>;
    }

    // Add more conditions for other options if needed
    return null;
  };

  return (
    <Container>
      <div className="main-body mt-5">
        <Row className="gutters-sm">
          <Col md={4} className="mt-3">
            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-center text-center">
                  <Image src="" alt="Admin" className="rounded-circle" width={150} />
                  <div className="mt-3">
                    <h4>John Doe</h4>
                    <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className="mt-5">
              <ul className="list-group list-group-flush">
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
