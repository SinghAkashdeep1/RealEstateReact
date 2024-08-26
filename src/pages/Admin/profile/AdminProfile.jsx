import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { adminAuth, adminProfileUpdate, adminChangePassword } from "../../../adminStore/authApi/authApiSlices";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminProfileData, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [current_password, setPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_password_confirmation, setConfirmNewPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    dispatch(adminAuth());
  }, [dispatch]);

  useEffect(() => {
    if (adminProfileData && adminProfileData.user) {
      setName(adminProfileData.user.name);
      setEmail(adminProfileData.user.email);
    }
  }, [adminProfileData]);

  const validateProfileForm = () => {
    let isValid = true;
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validatePasswordForm = () => {
    let isValid = true;
    let errors = {};

    if (!current_password.trim()) {
      errors.current_password = "Current password is required";
      isValid = false;
    }

    if (!new_password.trim()) {
      errors.new_password = "New password is required";
      isValid = false;
    } else if (new_password.length < 6) {
      errors.new_password = "New password must be at least 6 characters";
      isValid = false;
    }

    if (!new_password_confirmation.trim()) {
      errors.new_password_confirmation = "Confirm new password is required";
      isValid = false;
    } else if (new_password_confirmation !== new_password) {
      errors.new_password_confirmation = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_name"); 
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    dispatch(adminProfileUpdate({ name, email }))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Failed to update profile.");
        }
      })
      .catch((err) => {
        const status = err.response?.status;
        const message = err.response?.data?.message || "Unknown error";
        if (status === 400) {
          toast.error(`Bad request: ${message}`);
        } else if (status === 401) {
          toast.error(`Unauthorized: ${message}`);
        } else if (status === 500) {
          toast.error(`Server error: ${message}`);
        } else {
          toast.error(`Failed to update profile: ${message}`);
        }
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    dispatch(adminChangePassword({ current_password, new_password, new_password_confirmation }))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success("Password changed successfully!");
          setPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else {
          toast.error("Failed to change password.");
        }
      })
      .catch((err) => {
        const status = err.response?.status;
        const message = err.response?.data?.message || "Unknown error";
        if (status === 400) {
          toast.error(`Bad request: ${message}`);
        } else if (status === 401) {
          toast.error(`Unauthorized: ${message}`);
        } else if (status === 500) {
          toast.error(`Server error: ${message}`);
        } else {
          toast.error(`Failed to change password: ${message}`);
        }
      });
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <Container className="wrapper">
      <Row>
        <Col>
          <h1 className="p-2">
            <GrUserAdmin /> Admin Profile
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          {adminProfileData && adminProfileData.user && (
            <div className="d-flex flex-column align-items-center border-top border-black border-4 admin-profile rounded mt-3 px-5 py-4">
              <div className="border border-secondary border-2 rounded-circle profile-icon mb-1">
                <RiAdminFill size={70} className="p-1 bg-transparent" />
              </div>
              <div className="text-center bg-transparent">
                <h4 className="text-center bg-transparent">{adminProfileData.user.username}</h4>
                <p className="text-center bg-transparent">Admin</p>
              </div>
              <div className="px-1 py-1 bg-transparent">
                <hr className="my-1" />
                <div className="d-flex justify-content-between bg-transparent">
                  <p className="text-center bg-transparent"><strong className="text-center bg-transparent">Email:</strong></p>
                  <p className="ms-2 text-primary  bg-transparent">{adminProfileData.user.email}</p>
                </div>
                <hr className="my-1" />
                <div className="d-flex justify-content-between  bg-transparent">
                  <p className=" bg-transparent"><strong className=" bg-transparent">Joining:</strong></p>
                  <p className="ms-2 text-primary  bg-transparent">{formatDateTime(adminProfileData.user.created_at)}</p>
                </div>
                <hr className="my-1" />
                <div className="mb-1 mt-2  bg-transparent">
                  <Button variant="dark" onClick={handleLogout} className="rounded-pill w-100">
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col md={9}>
          <Card className="mt-4">
            <Card.Header className="p-2 display-flex form-inline" style={{ backgroundColor: "#EFEFDF" }}>
              <h3 style={{ color: "#080705", backgroundColor: "transparent" }}>
                {showChangePassword ? "Change Password" : "Edit Personal Info."}
              </h3>
            </Card.Header>
            <Card.Body style={{ backgroundColor: "#F4F4ED" }}>
              {!showChangePassword ? (
                <Form onSubmit={handleProfileSubmit} className="bg-transparent">
                  <Form.Group as={Row} controlId="name" className="mb-3 bg-transparent">
                    <Form.Label column md={3} className="bg-transparent">
                      <b className="bg-transparent">Name</b>
                    </Form.Label>
                    <Col md={9} className="bg-transparent">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {formErrors.name && <Form.Text className="text-danger">{formErrors.name}</Form.Text>}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="email" className="mb-3 bg-transparent">
                    <Form.Label column md={3} className="bg-transparent">
                      <b className="bg-transparent">Email</b>
                    </Form.Label>
                    <Col md={9} className="bg-transparent">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {formErrors.email && <Form.Text className="text-danger">{formErrors.email}</Form.Text>}
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-2 bg-transparent">
                    <Col md={{ span: 9, offset: 3 }} className="bg-transparent">
                      <Button variant="danger" type="submit">Save Changes</Button>
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={() => setShowChangePassword(true)}
                      >
                        Change Password
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              ) : (
                <Form onSubmit={handlePasswordSubmit} className="bg-transparent">
                  <Form.Group as={Row} controlId="currentPassword" className="mb-3 bg-transparent">
                    <Form.Label column md={3} className="bg-transparent">
                      <b className="bg-transparent">Current Password</b>
                    </Form.Label>
                    <Col md={9} className="bg-transparent">
                      <Form.Control
                        type="password"
                        name="current_password"
                        placeholder="Enter current password"
                        value={current_password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {formErrors.current_password && <Form.Text className="text-danger">{formErrors.current_password}</Form.Text>}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="new_password" className="mb-3 bg-transparent">
                    <Form.Label column md={3} className="bg-transparent">
                      <b className="bg-transparent">New Password</b>
                    </Form.Label>
                    <Col md={9} className="bg-transparent">
                      <Form.Control
                        type="password"
                        name="new_password"
                        placeholder="Enter new password"
                        value={new_password}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      {formErrors.new_password && <Form.Text className="text-danger">{formErrors.new_password}</Form.Text>}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="new_password_confirmation" className="mb-3 bg-transparent">
                    <Form.Label column md={3} className="bg-transparent">
                      <b className="bg-transparent">Confirm New Password</b>
                    </Form.Label>
                    <Col md={9} className="bg-transparent">
                      <Form.Control
                        type="password"
                        name="new_password_confirmation"
                        placeholder="Confirm new password"
                        value={new_password_confirmation}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                      {formErrors.new_password_confirmation && <Form.Text className="text-danger">{formErrors.new_password_confirmation}</Form.Text>}
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-2 bg-transparent">
                    <Col md={{ span: 9, offset: 3 }} className="bg-transparent">
                      <Button variant="danger" type="submit">Change Password</Button>
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={() => setShowChangePassword(false)}
                      >
                        Back to Profile
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
