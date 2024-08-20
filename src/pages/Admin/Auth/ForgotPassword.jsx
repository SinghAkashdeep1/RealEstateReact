import React, { useState } from "react"; // Import useState
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { MdAttachEmail } from "react-icons/md"; // Ensure you import MdAttachEmail
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State to hold the email input

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // Here, you can add your logic to handle the forgot password
    // For now, just display a toast notification
    if (email) {
      toast.success("Password reset link sent to your email!");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Row>
        <Col>
          <h2 className={`${styles.fpstyheading} text-center mb-4`}>Forgot Password</h2>
          <Form
            className="p-4 bg-white border rounded-4"
            onSubmit={handleSubmit} // Add the handleSubmit function
          >
            <Form.Label className="text-dark p-2 fw-medium">
              E-Mail Address
            </Form.Label>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="formGroupEmail" // Provide a control ID
            >
              <Form.Control
                className="rounded-1 border border-2 me-2"
                type="email"
                placeholder="Enter Your E-mail"
                value={email} // Set value to the state variable
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required
              />
              <MdAttachEmail size={25} />
            </Form.Group>
            <Button
              type="submit"
              className={`${styles.buttonForm} border border-0 rounded-top w-100 mb-2 mt-2`}
            >
              Click to Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ForgotPassword;
