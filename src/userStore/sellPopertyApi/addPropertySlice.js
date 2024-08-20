import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { propertyAddApi } from "./addPropertyServices";
import { typesListApi } from "./addPropertyServices";

const initialState = {
  loading: false,
  error: "",
  propertyData: [],
  typeLists: [],
};

export const typeList = createAsyncThunk(
  "user/fetchTypes",
  async (data, thunkAPI) => {
    try {
      const response = await typesListApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProperty = createAsyncThunk(
  "user/addProperty",
  async (data, thunkAPI) => {
    try {
      const response = await propertyAddApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add property"
      );
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //get types
      .addCase(typeList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(typeList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.typeLists = action.payload;
      })
      .addCase(typeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propertyData = action.payload;
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
