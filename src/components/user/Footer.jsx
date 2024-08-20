import React from "react";
import footerLogo from "../../assets/images/user/UserLogo.png";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-block1">
          <img src={footerLogo} alt="" height={140} width={193} />
          <p className="aboutDesc">
            Discover your dream home with Realesta. Whether buying, selling, or
            investing, we're your trusted partner in real estate. Explore our
            listings, find expert advice, use advanced calculators, and make
            informed decisions. Your journey to the perfect property starts
            here. Partner with Realesta to navigate the dynamic world of real
            estate investment confidently. Your success is our mission as we
            strive to deliver unparalleled value and growth potential for our
            investors.
          </p>
          <div className="footerLogo">
            <button className="buttonSM"> <BsFacebook size={40} className="bg-transparent text-white" /> </button>
            <button className="buttonSM"> <BsInstagram size={40} className="bg-transparent text-white"  /> </button>
            <button className="buttonSM "> <FaYoutube size={40} className="bg-transparent text-white" /> </button>
          </div>
        </div>
        <div className="footer-block2">
           
        </div>
      </div>
    </>
  );
};

export default Footer;
