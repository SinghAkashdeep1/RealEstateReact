import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listingTypesApi,
  listingTypeAddApi,
  listingTypeStatusApi,
  listingTypeDeleteApi,
} from "./listTypeApiServices";

const initialState = {
  loading: false,
  error: "",
  typesList: [],
  listingTypes:[],
  listingType:[]
};

export const listingTypesList = createAsyncThunk(
  "admin/fetchListingTypes",
  async (data, thunkAPI) => {
    try {
      const response = await listingTypesApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addlistingType = createAsyncThunk(
  "admin/addlistingType",
  async (data, thunkAPI) => {
    try {
      const response = await listingTypeAddApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//status

export const listingTypeStatus = createAsyncThunk(
  "admin/listingTypeStatus",
  async (data, thunkAPI) => {
    try {
      const response = await listingTypeStatusApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to change status"
      );
    }
  }
);

//delete
export const deletelistingType = createAsyncThunk(
  "admin/deletelistingType",
  async (data, thunkAPI) => {
    try {
      const response = await listingTypeDeleteApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to delete user"
      );
    }
  }
);

const listingTypeSlice = createSlice({
  name: "listingTypes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(listingTypesList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(listingTypesList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.typesList = action.payload;
      })
      .addCase(listingTypesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add 
      .addCase(addlistingType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addlistingType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.listingTypes = action.payload;
      })
      .addCase(addlistingType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //staus 
      .addCase(listingTypeStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(listingTypeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.listingType = action.payload;
      })
      .addCase(listingTypeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete listingType
      .addCase(deletelistingType.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deletelistingType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.listingType = action.payload;
      })
      .addCase(deletelistingType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default listingTypeSlice.reducer;
