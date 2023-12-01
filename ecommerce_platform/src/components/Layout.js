import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home Page</h2>
    {/* Link to navigate to the About page */}
    <p>
      Go to the <Link to="login">Login</Link> page.
      Go to the <Link to="registration">Registration</Link> page.
    </p>
  </div>
);

export default Home();