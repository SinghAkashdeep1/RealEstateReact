import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  propertyTypesApi,
  propertyTypeAddApi,
  propertyTypeStatusApi,
  propertyTypeDeleteApi,
} from "./propertyTypeServices";

const initialState = {
  loading: false,
  error: "",
  propertyList: [],
  propertyTypes:[],
  propertyType:[]
};

export const propertyTypesList = createAsyncThunk(
  "admin/fetchPropertyTypes",
  async (data, thunkAPI) => {
    try {
      const response = await propertyTypesApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addPropertyType = createAsyncThunk(
  "admin/addlistingType",
  async (data, thunkAPI) => {
    try {
      const response = await propertyTypeAddApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//status

export const propertyTypeStatus = createAsyncThunk(
  "admin/listingTypeStatus",
  async (data, thunkAPI) => {
    try {
      const response = await propertyTypeStatusApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to change status"
      );
    }
  }
);

//delete
export const deletePropertyType = createAsyncThunk(
  "admin/deletepropertyType",
  async (data, thunkAPI) => {
    try {
      const response = await propertyTypeDeleteApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to delete user"
      );
    }
  }
);

const propertyTypeSlice = createSlice({
  name: "propertyTypes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(propertyTypesList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propertyTypesList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propertyList = action.payload;
      })
      .addCase(propertyTypesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add 
      .addCase(addPropertyType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addPropertyType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propertyTypes = action.payload;
      })
      .addCase(addPropertyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //staus 
      .addCase(propertyTypeStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propertyTypeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propertyType = action.payload;
      })
      .addCase(propertyTypeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete listingType
      .addCase(deletePropertyType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deletePropertyType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.propertyType = action.payload;
      })
      .addCase(deletePropertyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertyTypeSlice.reducer;
