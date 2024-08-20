import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const authLoginApi = async (data) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/admin/login`, data);
    return response;
  } catch (error) {
    console.error("Error in authLoginApi:", error);
    throw error;
  }
};

export const authLogoutApi = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };    
      const response = await axios.post(`http://127.0.0.1:8000/api/admin/logout`,null, headers );
      return response;
    } catch (error) {
      console.error("Error in Logout API:", error);
      throw error;
    }
  };
  
  