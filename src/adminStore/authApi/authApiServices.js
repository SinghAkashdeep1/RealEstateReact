import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const authLoginApi = async (data) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/login`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error in authLoginApi:", error);
    throw error;
  }
};

export const authLogoutApi = async () => {
  try {
    const token = localStorage.getItem("admin_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/logout`,
      null,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in Logout API:", error);
    throw error;
  }
};

//get admin profile
export const adminAuthApi = async () => {
  try {
    const token = localStorage.getItem("admin_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/admin/profile`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in adminAuthApi:", error);
    throw error;
  }
};

//edit admin
export const adminProfileUpdateApi = async (data) => {
  try {
    const token = localStorage.getItem("admin_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/profile/edit`,
      data,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in adminProfileUpdateApi:", error);
    throw error;
  }
};

//password update
export const adminChangePassApi = async (data) => {
  try {
    const token = localStorage.getItem("admin_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/profile/change_password`,
      data,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in adminChangePassApi:", error);
    throw error;
  }
};

export const forgotPasswordApi = async (data) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/admin/forgot-password`, data);
    return response;
  } catch (error) {
    console.error("Error in forgotPasswordApi:", error);
    throw error;
  }
};

export const resetPasswordPostApi = async (data) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/admin/reset-password`, data);
    return response;
  } catch (error) {
    console.error("Error in ressetPasswordPostApi:", error);
    throw error;
  }
};
