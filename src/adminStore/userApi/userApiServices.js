import axios from "axios";

//const baseUrl = process.env.REACT_APP_BASE_URL;

export const userListApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/admin/user/list`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in userListApi:", error);
    throw error;
  }
};

//add user
export const userAddApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/user/add`,
      data,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in userAddApi:", error);
    throw error;
  }
};

//user status
export const userStatusApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://127.0.0.1:8000/api/admin/user/status/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in userListApi:", error);
    throw error;
  }
};

 //get edit
 export const userEditGetApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://127.0.0.1:8000/api/admin/user/edit/${data}`, headers);
    return response;
  } catch (error) {
    console.error("Error in userListApi:", error);
    throw error;
  }
};

//edit user
export const userEditPostApi = async ({id,data}) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`http://127.0.0.1:8000/api/admin/user/update/${id}`, data, headers);
    return response;
  } catch (error) {
    console.error("Error in userAddApi:", error);
    throw error;
  }
};


//delete user
export const userDeleteApi = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/user/delete/${data}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error in userDeleteApi:", error);
    throw error;
  }
};
