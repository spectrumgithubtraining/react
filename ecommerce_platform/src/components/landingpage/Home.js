import React from "react";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img className="mt-5" src="https://i.postimg.cc/dVxpmByT/blue-t-shirt.jpg" alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Favourite Design
          </h1>
          <p className="primary-text">
          Whoever said money can't buy happiness simply didn't know where to go shopping.
          </p>
          <Link style={{textDecoration:"none"}} to={'/productPage'}>
          <button className="secondary-button">
            Order Now <FiArrowRight />{" "}
          </button>

          </Link>
         
        </div>
        <div className="home-image-section">
          <img alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
