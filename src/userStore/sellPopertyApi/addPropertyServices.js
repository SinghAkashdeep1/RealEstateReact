import axios from "axios";


export const typesListApi = async (data) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/type/property`);
    
    return response;
  } catch (error) {
    console.error("Error in userListApi:", error);
    throw error;
  }
};


export const propertyAddApi = async (data) => {
    try {
      const token = localStorage.getItem("token");
            const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`http://127.0.0.1:8000/api/add/property`, data, headers);
      return response;
    } catch (error) {
      console.error("Error in propertyAddApi:", error);
      throw error;
    }
  };
  