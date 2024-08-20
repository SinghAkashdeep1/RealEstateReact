import axios from "axios";

//property types
export const propertyTypesApi = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/property-type/list`,
        headers
      );
      return response;
    } catch (error) {
      console.error("Error in propertyTypesApi:", error);
      throw error;
    }
  };


//add property
export const propertyTypeAddApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/property-type/add`,
      data,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in propertyTypeAddApi:", error);
    throw error;
  }
};

//property status
export const propertyTypeStatusApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/admin/property-type/status/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in propertyTypeStatusApi:", error);
    throw error;
  }
};

//delete user
export const propertyTypeDeleteApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/property-type/delete/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in propertyTypeDeleteApi:", error);
    throw error;
  }
};


