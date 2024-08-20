import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthLogin } from "../../../adminStore/authApi/authApiSlices";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { MdEmail, MdLock } from "react-icons/md";
import adminLogo from "../../../assets/images/admin/login.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authCred, setAuthCred] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError({ ...error, [name]: "" });
    setAuthCred({ ...authCred, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (authCred.email && authCred.password) {
        const response = await dispatch(AuthLogin(authCred));
        const token = response.payload.data.data.token;
        const name = response.payload.data.data.name;
        console.log(response.payload.data.data);

        toast.success("logged in successfully");
        // Save token to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);

        // Navigate to dashboard

        navigate("/admin/dashboard");
      } else {
        toast.warning("input field required");

        setError({
          email: authCred.email ? "" : "Email is required",
          password: authCred.password ? "" : "Password is required",
        });
      }
    } catch (error) {
      toast.error("Invalid credentials");
      setError({
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Row>
       
        <Col sm={7}>
          <h1 className={`${styles.heading} heading text-center mb-3`}>
            Admin Login
          </h1>
          <Form onSubmit={handleSubmit} className={styles.inputGroup}>
            <p className={`${styles.para} text-center  mb-3`}>
              Sign in to start your session
            </p>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="formGroupEmail"
            >
              <Form.Control
                className="rounded-start-pill p-2 me-2"
                type="email"
                name="email"
                placeholder="Email"
                value={authCred.email}
                onChange={handleChange}
              />
              <MdEmail size={50} style={{ color: "#470826" }} />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="formGroupPassword"
            >
              <Form.Control
                className="rounded-start-pill p-2 me-2"
                type="password"
                name="password"
                placeholder="Password"
                value={authCred.password}
                onChange={handleChange}
              />
              <MdLock size={50} style={{ color: "#470826" }} />
            </Form.Group>

            <Link
              to="/admin/forgot-password"
              className="text-primary text-decoration-none"
            >
              Forgot Password?
            </Link>

            <Button
              type="submit"
              className={`${styles.submitButton} border border-0 rounded-top w-100 mb-2 mt-4`}
            >
              Submit
            </Button>
          </Form>
          <ToastContainer />{" "}
          {/* Make sure to include ToastContainer for toasts */}
        </Col>
        <Col sm={5}>
          <img src={adminLogo} width="360" height="350" alt="admin-logo" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
