import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {userAuth, userProfileUpdate, userChangePassword } from "../../userStore/authApi/userAuthSlices";
import styles from "./EditProfile.module.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdEmail, MdLock } from "react-icons/md";
import { BiSolidRename } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditProfile = () => {
  const [activeComponent, setActiveComponent] = useState("changePersonalInfo");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const dispatch = useDispatch();

  const handleButtonClick = (component) => {
    setActiveComponent(component);
    // Clear errors on component switch
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePersonalInfo = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validatePassword = () => {
    let valid = true;
    const newErrors = {};
  
    // Validate current password
    if (formData.newPassword && !formData.currentPassword) {
      newErrors.currentPassword = "Current password is required when setting a new password.";
      valid = false;
    } else if (formData.currentPassword.length < 6) {
      newErrors.currentPassword = "Current password must be at least 6 characters long.";
      valid = false;
    }
  
    // Validate new password
    if (formData.currentPassword && !formData.newPassword) {
      newErrors.newPassword = "New password is required.";
      valid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters long.";
      valid = false;
    } else if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "New password must be different from the current password.";
      valid = false;
    }
  
    // Validate new password confirmation
    if (formData.newPassword && formData.newPassword !== formData.newPasswordConfirmation) {
      newErrors.newPasswordConfirmation = "New password confirmation does not match.";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  

  const handleSubmitPersonalInfo = (e) => {
    e.preventDefault();
    if (validatePersonalInfo()) {
      dispatch(userProfileUpdate({ name: formData.name, email: formData.email }))
        .then(() => {
          dispatch(userAuth()); 
          toast.success("Personal info updated successfully!");
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`);
        });
    } else {
      // Show client-side validation errors
      Object.values(errors).forEach((error) => {
        if (error) toast.error(error);
      });
    }
  };
  
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    
    if (validatePassword()) {
      dispatch(userChangePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        newPasswordConfirmation: formData.newPasswordConfirmation,
      }))
        .then((response) => {
          if (response && response.payload.code === 200) {
            dispatch(userAuth()); // Refetch user data
            toast.success("Password changed successfully!");
          } else {
            toast.error("Password change failed. Please try again.");
          }
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`);
        });
    } else {
      // Show client-side validation errors
      Object.values(errors).forEach((error) => {
        if (error) toast.error(error);
      });
    }
  };
  
  

  return (
    <>
      <div className={styles.buttonContainerBox}>
        <div
          className={`${styles.buttonContainer} ${
            activeComponent === "changePersonalInfo" ? styles.activeButton : ""
          }`}
        >
          <Link
            className="bg-transparent text-secondary text-decoration-none"
            onClick={() => handleButtonClick("changePersonalInfo")}
          >
            Personal Info
          </Link>
        </div>
        <div
          className={`${styles.buttonContainer} ${
            activeComponent === "editPassword" ? styles.activeButton : ""
          }`}
        >
          <Link
            className="bg-transparent text-secondary text-decoration-none"
            onClick={() => handleButtonClick("editPassword")}
          >
            Edit Password
          </Link>
        </div>
      </div>

      {activeComponent === "changePersonalInfo" && (
        <div className={`${styles.changePersonalInfo} bg-transparent`}>
          <div className={styles.formTitleContainer}>
            <h1 className={styles.formPersInfoTitle}>Personal Info</h1>
          </div>
          <div className={styles.formContainer}>
            <Form onSubmit={handleSubmitPersonalInfo} className={styles.formInputBox}>
              <Form.Group className="bg-transparent mb-3 d-flex align-items-center" controlId="formGroupName">
                <Form.Control
                  className="rounded-pill p-2 me-2"
                  type="text"
                  name="name"
                  placeholder="Enter new name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <BiSolidRename size={40} className={styles.formIcon} />
              </Form.Group>
              {errors.name && <div className={styles.error}>{errors.name}</div>}

              <Form.Group className="bg-transparent mb-3 d-flex align-items-center" controlId="formGroupEmail">
                <Form.Control
                  className="rounded-pill p-2 me-2"
                  type="text" // Using type="text" to allow custom validation
                  name="email"
                  placeholder="Enter new email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <MdEmail size={40} className={styles.formIcon} />
              </Form.Group>
              {errors.email && <div className={styles.error}>{errors.email}</div>}
              <Button
                type="submit"
                className={`${styles.submitButton} border border-0 rounded-top w-100 mb-2 mt-4`}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      )}

      {activeComponent === "editPassword" && (
        <div className={`${styles.changePassword} bg-transparent`}>
          <div className={styles.formTitleContainer}>
            <h1 className={styles.formPersInfoTitle}>Edit Password</h1>
          </div>
          <div className={styles.formContainer}>
            <Form onSubmit={handleSubmitPassword} className={styles.formInputBox}>
              <Form.Group className="bg-transparent mb-3 d-flex align-items-center" controlId="formGroupCurrentPassword">
                <Form.Control
                  className="rounded-pill p-2 me-2"
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                />
                <MdLock size={40} className={styles.formIcon} />
              </Form.Group>
              {errors.currentPassword && <div className={styles.error}>{errors.currentPassword}</div>}

              <Form.Group className="bg-transparent mb-3 d-flex align-items-center" controlId="formGroupNewPassword">
                <Form.Control
                  className="rounded-pill p-2 me-2"
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                <MdLock size={40} className={styles.formIcon} />
              </Form.Group>
              {errors.newPassword && <div className={styles.error}>{errors.newPassword}</div>}

              <Form.Group className="bg-transparent mb-3 d-flex align-items-center" controlId="formGroupNewPasswordConfirmation">
                <Form.Control
                  className="rounded-pill p-2 me-2"
                  type="password"
                  name="newPasswordConfirmation"
                  placeholder="Confirm New Password"
                  value={formData.newPasswordConfirmation}
                  onChange={handleInputChange}
                />
                <MdLock size={40} className={styles.formIcon} />
              </Form.Group>
              {errors.newPasswordConfirmation && <div className={styles.error}>{errors.newPasswordConfirmation}</div>}

              <Button
                type="submit"
                className={`${styles.submitButton} border border-0 rounded-top w-100 mb-2 mt-4`}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      )}

      <div className={styles.emptyBox}></div>
    </>
  );
};

export default EditProfile;
