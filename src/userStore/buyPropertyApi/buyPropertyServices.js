import axios from "axios";

export const propertiesTypesListApi = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/search/property-types`);
    return response;
  } catch (error) {
    console.error("Error in propertiesListApi:", error);
    throw error;
  }
};

export const propertiesListApi = async (params) => {
  try {
        const headers = {
      params
    };
    const response = await axios.get(`http://127.0.0.1:8000/api/list/properties`, headers);
    return response;
  } catch (error) {
    console.error("Error in propertiesListApi:", error);
    throw error;
  }
};

export const propertyDetailApi = async (data) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/property/detail/${data}`);
    return response;
  } catch (error) {
    console.error("Error in propertiesListApi:", error);
    throw error;
  }
};
