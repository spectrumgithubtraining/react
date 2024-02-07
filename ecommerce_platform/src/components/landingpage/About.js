import React from "react";

import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img  alt="" />
      </div>
      <div className="about-section-image-container">
        <img src="" alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        When in doubt, go shopping. 
        </h1>
        <p className="primary-text">
        In today's fast-paced world, where time is of the essence, traditional shopping methods can often feel cumbersome and limiting. We recognize the importance of embracing technology to revolutionize the way you shop. With just a few clicks or taps, you can explore a vast array of products from the comfort of your home or on the go.
        </p>
        <p className="primary-text">
        At J$L, we invite you to embark on a shopping experience like no other. Join us as we embark on this journey together, where every click brings you one step closer to discovering something extraordinary. Thank you for choosing us as your trusted partner in shopping.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
      
        </div>
      </div>
    </div>
  );
};

export default About;
