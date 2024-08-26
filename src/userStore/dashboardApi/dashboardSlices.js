import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardUserPropertiesApi } from "./dashboardServices";

const initialState = {
  loading: false,
  error: "",
  userPropertiesData: []
};

export const userPropertiesSell = createAsyncThunk(
  "user/userPropertiesSell",
  async (data, thunkAPI) => {
    try {
      const response = await dashboardUserPropertiesApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userDashBoard = createSlice({
  name: "userDashBoard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userPropertiesSell.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userPropertiesSell.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userPropertiesData = action.payload; 
      })
      .addCase(userPropertiesSell.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDashBoard.reducer;
