import React from 'react';
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="py-5" style={{ backgroundColor: '#3d5027'}}>
      <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
        <img style={{width:"150px"}} src="https://i.postimg.cc/FK4K1dSJ/J-L-logos-black.png" alt="" />

        </div>
        <div className="footer-icons">
          <BsTwitter className='me-4' />
          <SiLinkedin className='me-4' />
          <BsYoutube className='me-4' />
          <FaFacebookF className='me-4' />
        </div>
      </div>
      <div className="footer-section-two">
     
        <div className="footer-section-columns">
          <span className='me-3'>244-5333-7783</span>
          <span  className='me-3'>j&L@outfit.com</span>
          <span  className='me-3'>outfit@j&L.com</span>
        </div>
        <div className="footer-section-columns">
          <span  className='me-5'>Terms & Conditions</span>
          <span  className='me-5'>Privacy Policy</span>
        </div>
      </div>
    </div>
      </footer>
    </div>
  );
}

export default Footer;
