import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { MdAttachEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";
import { FaUser } from "react-icons/fa";
import { BiRename } from "react-icons/bi";
import { TbPassword } from "react-icons/tb";
import { MdPassword } from "react-icons/md";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../userStore/authApi/userAuthSlices"; // Adjust the path to your slice

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch = useDispatch();

  // Regex for validating email addresses
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation logic
    if (!name || !username || !email || !password || !confirm_password) {
      toast.error("Please ensure all fields are filled out correctly.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirm_password) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    try {
      await dispatch(
        userRegister({ name, username, email, password, confirm_password })
      ).unwrap();
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed: " + (error.message || "Unknown error"));
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Row>
          <Col>
            <h2 className={`${styles.fpstyheading} text-center mb-4`}>
              Register as a New Member
            </h2>
            <div className={`${styles.rowContainer} text-align-center`}>
              <p className="text-info p-2 fw-medium">
                You already have an account?
              </p>
            </div>
            <Form
              className="p-4 bg-white border rounded-4"
              onSubmit={handleSubmit}
            >
              <div className={`${styles.rowContainer}`}>
                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  controlId="formName"
                >
                  <Form.Label className="text-dark p-2 fw-medium me-3">
                    Name:
                  </Form.Label>
                  <Form.Control
                    className="rounded-1 border border-2 me-5"
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FaUser size={25} />
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  controlId="formUsername"
                >
                  <Form.Label className="text-dark p-2 fw-medium ms-5">
                    Username:
                  </Form.Label>
                  <Form.Control
                    className="rounded-1 border border-2 me-2"
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <BiRename size={25} />
                </Form.Group>
              </div>
              <Form.Group
                className="mb-3 d-flex align-items-center"
                controlId="formEmail"
              >
                <Form.Label className="text-dark p-2 fw-medium">
                  E-Mail Address:
                </Form.Label>
                <Form.Control
                  className="rounded-1 border border-2 me-2"
                  type="text"
                  placeholder="Enter Your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdAttachEmail size={25} />
                {emailError && <div className="text-danger">{emailError}</div>}
              </Form.Group>

              <div className={`${styles.rowContainer}`}>
                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  controlId="formPassword"
                >
                  <Form.Label className="text-dark p-2 fw-medium">
                    Password:
                  </Form.Label>
                  <Form.Control
                    className="rounded-1 border border-2 me-2"
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TbPassword size={25} />
                  {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  controlId="formConfirmPassword"
                >
                  <Form.Label className="text-dark p-2 fw-medium ms-5">
                    Confirm Password:
                  </Form.Label>
                  <Form.Control
                    className="rounded-1 border border-2 me-2"
                    type="password"
                    placeholder="Confirm Your Password"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <MdPassword size={25} />
                  {confirmPasswordError && (
                    <div className="text-danger">{confirmPasswordError}</div>
                  )}
                </Form.Group>
              </div>

              <Button
                type="submit"
                className={`${styles.buttonForm} border border-0 rounded-top w-100 mb-2 mt-2`}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Register;
