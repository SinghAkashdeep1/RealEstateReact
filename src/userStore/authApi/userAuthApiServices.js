import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const authUserLoginApi = async (data) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/login`, data);
    return response;
  } catch (error) {
    console.error("Error in authLoginApi:", error);
    throw error;
  }
};

export const userRegisterApi = async (data) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/registration`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error in authLoginApi:", error);
    throw error;
  }
};

export const authUserLogoutApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/logout`,
      null,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in Logout API:", error);
    throw error;
  }
};

//get user profile
export const userAuthApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/profile`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in userAuthApi:", error);
    throw error;
  }
};

//edit user
export const userProfileUpdateApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/user/profile/edit`,
      data,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in userProfileUpdateApi:", error);
    throw error;
  }
};

//password update
export const userChangePassApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/user/profile/change_password`,
      data,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in userChangePassApi:", error);
    throw error;
  }
};

//forgot pass
export const userForgotPasswordApi = async (data) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/forgot-password`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error in userForgotPasswordApi:", error);
    throw error;
  }
};

export const userresetPassPostApi = async (data) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/reset-password`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error in userresetPassPostApi:", error);
    throw error;
  }
};
