import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { RiUserFill, RiMailFill } from "react-icons/ri";
import { SiNamecheap } from "react-icons/si";
import { Col, Row } from "react-bootstrap";
import { HiUsers } from "react-icons/hi";
import { LiaCriticalRole } from "react-icons/lia";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userList,
  userEditGet,
  userEditPost,
} from "../../../adminStore/userApi/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const dummytypes = [
  { id: 2, name: "user" },
  { id: 1, name: "admin" },
];

const EditUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(userEditGet(id));
    }
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    type: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.user?.name,
      username: user?.user?.username,
      email: user?.user?.email,
      type: "",
    });
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    //   // Example: Check if the email domain matches dynamically entered value
    //   const domain = email.split('@')[1];
    //   if (domain !== formData.email) {
    //     toast.error(`Please enter an email from ${formData.email} domain`);
    //     return false;
    //   }

    return true;
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.type
    ) {
      toast.error("All fields are required!");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm() && validateEmail(formData.email)) {
      dispatch(userEditPost({ id, data: formData }))
        .then((response) => {
          if (response.payload.code === 200) {
            navigate("/admin/user/list");
            toast.success("User edit successfully");
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        });
    }
  };

  return (
    <Container className="p-3">
      <Row>
        <Col>
          <h1 className="p-2">
            <HiUsers /> Edit User
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="p-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center mb-3">
                  <RiUserFill size={45} className="me-2" />
                  <Form.Group controlId="formName" style={{ flex: 1 }}>
                    <Form.Label>
                      <b>Name</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-body rounded-pill"
                      
                    />
                  </Form.Group>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <SiNamecheap size={45} className="me-2" />
                  <Form.Group controlId="formUsername" style={{ flex: 1 }}>
                    <Form.Label>
                      <b>Username</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="bg-body rounded-pill"
                      
                    />
                  </Form.Group>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <RiMailFill size={45} className="me-2" />
                  <Form.Group controlId="formEmail" style={{ flex: 1 }}>
                    <Form.Label>
                      <b>Email address</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-body rounded-pill"
                      
                    />
                  </Form.Group>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <LiaCriticalRole size={45} className="me-2" />
                  <Form.Group controlId="formtype" style={{ flex: 1 }}>
                    <Form.Label>
                      <b>Select type</b>
                    </Form.Label>
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="bg-body rounded-pill"
                      aria-label="Select type"
                    >
                      <option value="">Select type</option>
                      {dummytypes?.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="rounded-pill w-100"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser;
