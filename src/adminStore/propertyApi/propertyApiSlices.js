import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { propListApi , propStatusApi , propDetApi } from "./propertyApiServices";

const initialState = {
  loading: false,
  error: "",
  propList: [],
  property: [],
  addressList:[],
  propDet :[]
};

export const propList = createAsyncThunk(
    "admin/fetchProp",
    async ({ page }, thunkAPI) => {
      try {
        const response = await propListApi({ page });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

//status

export const propStatus = createAsyncThunk(
  "admin/propStatus",
  async (data, thunkAPI) => {
    try {
      const response = await propStatusApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to change status"
      );
    }
  }
);

// get property
export const propDetail = createAsyncThunk(
    "admin/propertyDetail",
    async (data, thunkAPI) => {
      try {
        const response = await propDetApi(data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
const propSlice = createSlice({
  name: "property",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(propList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propList = action.payload.property.data; 
        state.addressList = action.payload;
        state.totalPages = action.payload.property.last_page; 
        state.currentPage = action.payload.property.current_page; // Current page
      })
      .addCase(propList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //staus user
      .addCase(propStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.property = action.payload;
      })
      .addCase(propStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //detail
      .addCase(propDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propDet = action.payload;
      })
      .addCase(propDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default propSlice.reducer;
