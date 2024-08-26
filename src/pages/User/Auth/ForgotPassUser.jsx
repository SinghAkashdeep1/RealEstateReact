import React, { useState } from "react"; 
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { MdAttachEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userForgotPassword } from "../../../userStore/authApi/userAuthSlices"; 
import "react-toastify/dist/ReactToastify.css";
import styles from "../../Admin/Auth/Login.module.css";
import { useNavigate } from 'react-router-dom';

const ForgotPassUser = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); 
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
    event.preventDefault();
    if (email) {
      try {
        const response = await dispatch(userForgotPassword({ email })).unwrap();
        console.log(response.data.token, "ffg");
        if (response.data.token) {
          toast.success("Password reset link sent to your email!");
          navigate(`/reset-password/${response.data.token}`);
        } else {
          toast.error('Failed to generate token');
        }
      } catch (err) {
        toast.error("Failed to send password reset link.");
      }
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
            onSubmit={handleSubmit} 
          >
            <Form.Label className="text-dark p-2 fw-medium">
              E-Mail Address
            </Form.Label>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="formGroupEmail" 
            >
              <Form.Control
                className="rounded-1 border border-2 me-2"
                type="email"
                placeholder="Enter Your E-mail"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
              <MdAttachEmail size={25} />
            </Form.Group>
            <Button
              type="submit"
              className={`${styles.buttonForm} border border-0 rounded-top w-100 mb-2 mt-2`}
              disabled={loading} // Disable button while loading
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

export default ForgotPassUser;
