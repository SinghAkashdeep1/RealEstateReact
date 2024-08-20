import axios from "axios";

//const baseUrl = process.env.REACT_APP_BASE_URL;

export const propListApi = async ({page}) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/admin/property/list?page=${page}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in propListApi:", error);
    throw error;
  }
};

//prop status
export const propStatusApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/admin/property/status/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in propStatusApi:", error);
    throw error;
  }
};

 
export const propDetApi = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://127.0.0.1:8000/api/admin/property/${data}`,  headers);
      return response;
    } catch (error) {
      console.error("Error in propDetApi:", error);
      throw error;
    }
  };
  