import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { AuthLogout } from "../../adminStore/authApi/authApiSlices";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleItemClick = (item) => {
    switch (item) {
      case "profile":
        navigate("/admin/profile");
        break;
      case "orders":
        navigate("/admin/sales/list");
        break;
      case "changePassword":
        navigate("/admin/profile/change_password");
        break;
      default:
        console.log("Unknown item clicked");
        break;
    }
  };

  const handleLogout = () => {
    dispatch(AuthLogout());
    localStorage.removeItem("admin_name"); 
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
    toast.success("Logout successfully");
  };

  return (
    <Navbar
      expand="lg"
      className="main-header navbar navbar-expand border-bottom"
      style={{ backgroundColor: "#EFEFDF" }}
    >
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ backgroundColor: "#EFEFDF" }}
      />
      <Navbar.Collapse
        id="basic-navbar-nav"
        style={{ backgroundColor: "#EFEFDF" }}
      >
        <Nav className="mr-auto ms-3" style={{ backgroundColor: "#EFEFDF" }}>
          <Nav.Link
            as={Link}
            to="/admin/dashboard"
            className="text-decoration-none"
            style={{ textDecoration: "none" }}
          >
            <h4>
              <strong
                className="text-grey text-decoration-none"
                style={{ backgroundColor: "#EFEFDF" , textDecoration: "none"}}
              >
               <FaHome size={30} style={{ backgroundColor: "#EFEFDF" }}/>  Home
              </strong>
            </h4>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <NavDropdown
        title={
          <FaUserCircle
            style={{ fontSize: "30px", backgroundColor: "#EFEFDF" }}
          />
        }
        className="custom-dropdown text-grey"
        id="basic-nav-dropdown"
        alignRight={false}
        style={{
          marginLeft: "auto",
          marginRight: "1rem",
          backgroundColor: "#EFEFDF",
        }}
      >
        <NavDropdown.Item onClick={() => handleItemClick("profile")}>
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleItemClick("changePassword")}>
          Change Password
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "4rem",
          backgroundColor: "#EFEFDF",
        }}
      >
        <strong className="mt-1" style={{ backgroundColor: "#EFEFDF" }}>
          {localStorage.getItem("admin_name") ? localStorage.getItem("admin_name") : "-"}
        </strong>
      </div>
    </Navbar>
  );
};

export default AdminHeader;
