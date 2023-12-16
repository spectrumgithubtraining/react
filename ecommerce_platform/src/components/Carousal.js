import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Carousal.css'; // Import the CSS file for styling
 
const Carousel = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const slide = useSpring({
    transform: `translateX(-${index * 100}%)`,
  });

  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
  ];

  return (
    <div className="carousel-container">
      <animated.div className="carousel" style={slide}>
        {images.map((image, i) => (
          <div key={i} className="carousel-item">
            <img src={image} alt={`Image ${i + 1}`} className="carousel-image" />
          </div>
        ))}
      </animated.div>
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Carousel;
