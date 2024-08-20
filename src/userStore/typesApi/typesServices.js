import axios from "axios";

export const propertyList = async (data) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/add/property`, data);
      return response;
    } catch (error) {
      console.error("Error in authLoginApi:", error);
      throw error;
    }
  };
  