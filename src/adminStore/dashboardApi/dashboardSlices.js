import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminDashboardApi } from "./dashboardServices";

const initialState = {
  loading: false,
  error: "",
  dataAdminDash: [],
  
};

export const adminDashboardData = createAsyncThunk(
    "dashboard/adminDashboardData",
    async ({ page, perPage }, thunkAPI) => {
      try {
        const response = await adminDashboardApi(page, perPage);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  


const adminDashSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(adminDashboardData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adminDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.dataAdminDash = action.payload;
      })
      .addCase(adminDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default adminDashSlice.reducer;
