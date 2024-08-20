import React from "react";
import "./user.css";
import UserLogo from "../../assets/images/user/UserLogo.png";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap for consistent styling

const Header = () => {
  return (
    <>
      <div className="site-space d-flex bg-primary-color justify-content-center">
        <div className="bg-primary-color text-center py-3 px-2 text-white d-flex flex-column flex-md-row gap-2 align-items-center font-14">
          Meet Your Personalized Assistant: Expert Guidance, Contact Us!
          <button
            type="button"
            className="btn rounded-pill bg-white text-primary px-4"
          >
            Beta User Feedback
          </button>
        </div>
      </div>
      <header className="mainHeader">
        <div>
          <Image src={UserLogo} rounded height={90} />
        </div>
        <div className="buttonContainer">
          <button
            className="btn btn-outline-primary me-3 rounded-pill px-4"
            type="submit"
          >
            Login
          </button>
          <button
            type="button"
            className="btn rounded-pill bg-primary text-white px-4"
          >
            Signup
          </button>
        </div>
      </header>
      <div className="gridButtons">
        <Row className="gridButtons">
        <Col className="gridButton">
          <Link to="/buy-property" className="text-decoration-none bg-transparent text-white">Buy</Link>
          </Col>
          <Col className="gridButton">
          <Link to="/add-property" className="text-decoration-none bg-transparent text-white">Sell</Link>
          </Col>
          <Col className="gridButton">PROfinder
          </Col>
          <Col className="gridButton">Realesta Page
          </Col>
          <Col className="gridButton">My Learning
          </Col>
          <Col className="gridButton">Tools
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;
