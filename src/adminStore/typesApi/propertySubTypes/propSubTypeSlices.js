import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    propSubTypesApi,
    propSubTypeAddApi,
    propSubTypeStatusApi,
    propSubTypeDeleteApi,
} from "./propSubTypeServices";

const initialState = {
  loading: false,
  error: "",
  subPropertyList: [],
  subPropertyTypes:[],
  subPropertyType:[]
};

export const propertySubTypesList = createAsyncThunk(
  "admin/fetchpropertySubTypesList",
  async (data, thunkAPI) => {
    try {
      const response = await propSubTypesApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addPropertySubType = createAsyncThunk(
  "admin/addPropertySubType",
  async (data, thunkAPI) => {
    try {
      const response = await propSubTypeAddApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//status

export const propertySubTypeStatus = createAsyncThunk(
  "admin/propertySubTypeStatus",
  async (data, thunkAPI) => {
    try {
      const response = await propSubTypeStatusApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to change status"
      );
    }
  }
);

//delete
export const deletePropertySubType = createAsyncThunk(
  "admin/deletePropertySubType",
  async (data, thunkAPI) => {
    try {
      const response = await propSubTypeDeleteApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to delete user"
      );
    }
  }
);

const propertySubTypeSlice = createSlice({
  name: "propertySubTypes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(propertySubTypesList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propertySubTypesList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.subPropertyList = action.payload;
      })
      .addCase(propertySubTypesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add 
      .addCase(addPropertySubType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addPropertySubType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.subPropertyTypes = action.payload;
      })
      .addCase(addPropertySubType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //staus 
      .addCase(propertySubTypeStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(propertySubTypeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.subPropertyType = action.payload;
      })
      .addCase(propertySubTypeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete listingType
      .addCase(deletePropertySubType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deletePropertySubType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.subPropertyType = action.payload;
      })
      .addCase(deletePropertySubType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySubTypeSlice.reducer;
