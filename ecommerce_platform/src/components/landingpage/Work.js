import React from "react";

const Work = () => {
  const workInfoData = [
    {
    
      title: "Choose Your Outfit",
      text: "Choose the  outfit you desire  press view button to view the product to purchase ",
    },
    {
    
      title: "Add to cart/Payment",
      text: "Add your outfit in cart for purchasing the product",
    },
    {
      
      title: "Fast Deliveries",
      text: "It will be in your doorstep within 7 days",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
       
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img  alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
