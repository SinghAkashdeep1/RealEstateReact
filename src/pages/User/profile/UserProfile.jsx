import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserProfile.module.css";
import { CgUserlane } from "react-icons/cg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { IoIosLogOut } from "react-icons/io";
import EditProfile from "../../../components/user/EditProfile";
import UserDashboard from "../../../components/user/UserDashboard";
import { userAuth, userAuthLogout } from "../../../userStore/authApi/userAuthSlices";
import { formatDate } from "../../../utils/dateUtils"; // Import the date formatting function
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userProfileData, loading, error } = useSelector(
    (state) => state.authUser
  );

  useEffect(() => {
    dispatch(userAuth());
  }, [dispatch]);

  const [activeComponent, setActiveComponent] = useState("dashboard"); // Default to 'dashboard'

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handleLogout = () => {
    try {
     dispatch(userAuthLogout())
     localStorage.removeItem("name"); 
     localStorage.removeItem("token");
      navigate("/login")
      toast.success("Logged out successfully")
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContainerBox}>
        <Row className="bg-transparent">
          <Col className="bg-transparent" xs={4}>
            <div className={styles.profileInfoIconBox}>
              <CgUserlane size={400} className={styles.profileInfoIcon} />
            </div>
          </Col>
          <Col className="bg-transparent" xs={6}>
            <div className={styles.profileInfoBox}>
              <h1 className={styles.profileGreet}>
                Welcome, <span className={styles.userNameStyle}>{userProfileData?.user?.username || "User"}</span>
              </h1>
              <h1 className={styles.userMailStyle}>{userProfileData?.user?.email || "No email provided"}</h1>
              <div className="bg-transparent">
                <h1 className={styles.userCreatedStyle}>
                  Created At: {userProfileData?.user?.created_at ? formatDate(userProfileData.user.created_at) : "N/A"}
                </h1>
                <h1 className={styles.userCreatedStyle}>
                  Email Verified: {userProfileData?.user?.email_verified_At || "-"}
                </h1>
              </div>
            </div>
          </Col>
          <Col className="bg-transparent" xs={2}>
            <div className={styles.profileInfoBox}>
              <Button variant="outline-secondary" onClick={handleLogout}>
                <IoIosLogOut className="bg-transparent" />
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.profileContainerBox}>
        <div
          className={`${styles.dashboardButton} ${
            activeComponent === "dashboard" ? styles.activeButton : ""
          }`}
        >
          <Link
            className="bg-transparent text-white text-decoration-none"
            onClick={() => handleButtonClick("dashboard")}
          >
            Dashboard
          </Link>
        </div>
        <div
          className={`${styles.dashboardButton} ${
            activeComponent === "editProfile" ? styles.activeButton : ""
          }`}
        >
          <Link
            className="bg-transparent text-white text-decoration-none"
            onClick={() => handleButtonClick("editProfile")}
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div className={styles.profileContentBox}>
        {activeComponent === "dashboard" && <UserDashboard />}
        {activeComponent === "editProfile" && <EditProfile />}
      </div>
    </div>
  );
};

export default UserProfile;
