import axios from "axios";

//property types
export const propSubTypesApi = async (data) => {
    try {
      const token = localStorage.getItem("admin_token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/property-subtype/list`,
        headers
      );
      return response;
    } catch (error) {
      console.error("Error in propSubTypesApi:", error);
      throw error;
    }
  };


//add property
export const propSubTypeAddApi = async (data) => {
  try {
    const token = localStorage.getItem("admin_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/property-subtype/add`,
      data,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in propSubTypeAddApi:", error);
    throw error;
  }
};

//property status
export const propSubTypeStatusApi = async (data) => {
  try {
    const token = localStorage.getItem("admin_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/admin/property-subtype/status/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in propSubTypeStatusApi:", error);
    throw error;
  }
};

//delete user
export const propSubTypeDeleteApi = async (data) => {
  try {
    const token = localStorage.getItem("admin_token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/property-subtype/delete/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in propSubTypeDeleteApi:", error);
    throw error;
  }
};


