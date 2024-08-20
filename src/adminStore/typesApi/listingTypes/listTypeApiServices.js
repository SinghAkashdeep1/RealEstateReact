import axios from "axios";

//listing types
export const listingTypesApi = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/listing-type/list`,
        headers
      );
      return response;
    } catch (error) {
      console.error("Error in listingTypesApi:", error);
      throw error;
    }
  };


//add user
export const listingTypeAddApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/listing-type/add`,
      data,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in listingTypeAddApi:", error);
    throw error;
  }
};

//user status
export const listingTypeStatusApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/admin/listing-type/status/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in listingTypeStatusApi:", error);
    throw error;
  }
};

//delete user
export const listingTypeDeleteApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/listing-type/delete/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in listingTypeDeleteApi:", error);
    throw error;
  }
};


