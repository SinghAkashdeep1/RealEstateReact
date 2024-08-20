import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { propertiesListApi } from "./buyPropertyServices";
import { propertyDetailApi } from "./buyPropertyServices";

const initialState = {
  loading: false,
  error: "",
  propertyList: [],
  dataSlider: [],
  propertyData: [],
};

export const propertiesList = createAsyncThunk(
  "user/fetchPropertiesList",
  async (data, thunkAPI) => {
    try {
      const response = await propertiesListApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const propertiesListSlider = createAsyncThunk(
  "user/fetchPropertiesListSlider",
  async (data, thunkAPI) => {
    try {
      const response = await propertiesListApi(data);
      console.log("API Response:", response.data); // Log the response to check its structure
      return response.data; // Assuming this returns the array directly
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// get property
export const propertyDetail = createAsyncThunk(
  "user/propertyDetail",
  async (data, thunkAPI) => {
    try {
      const response = await propertyDetailApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const propertySlice = createSlice({
  name: "propertyBuy",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //get list properties
      .addCase(propertiesList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propertiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propertyList = action.payload;
      })
      .addCase(propertiesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      //in slider
      .addCase(propertiesListSlider.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propertiesListSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.dataSlider = action.payload;
      })
      .addCase(propertiesListSlider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //property detail
      .addCase(propertyDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propertyDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propertyData = action.payload;
      })
      .addCase(propertyDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
