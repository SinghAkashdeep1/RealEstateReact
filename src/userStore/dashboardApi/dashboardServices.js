import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const dashboardUserPropertiesApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };   
    const response = await axios.get(`http://127.0.0.1:8000/api/user/properties/list`, headers);
    return response;
  } catch (error) {
    console.error("Error in dashboardUserPropertiesApi:", error);
    throw error;
  }
};
