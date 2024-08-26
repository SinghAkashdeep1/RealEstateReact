import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const adminDashboardApi = async (page = 1, perPage = 5) => {
    try {
      const token = localStorage.getItem("admin_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/dashboard?page=${page}&per_page=${perPage}`,
        { headers }
      );
      return response;
    } catch (error) {
      console.error("Error in dashboardApi:", error);
      throw error;
    }
  };
  


