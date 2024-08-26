import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userListApi } from "./userApiServices";
import { userStatusApi } from "./userApiServices";
import { userDeleteApi } from "./userApiServices";
import { userAddApi } from "./userApiServices";
import { userEditGetApi } from "./userApiServices";
import { userEditPostApi } from "./userApiServices";

const initialState = {
  loading: false,
  error: "",
  userLists: [],
  users: [],
  user: [],
};

export const userList = createAsyncThunk(
  "admin/fetchUsers",
  async (paginationParams, thunkAPI) => {
    try {
      const response = await userListApi(paginationParams);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "admin/addUsers",
  async (data, thunkAPI) => {
    try {
      const response = await userAddApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//status

export const userStatus = createAsyncThunk(
  "admin/userStatus",
  async (data, thunkAPI) => {
    try {
      const response = await userStatusApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to change status"
      );
    }
  }
);

//editget
export const userEditGet = createAsyncThunk(
  "admin/userEditGet",
  async (data, thunkAPI) => {
    try {
      const response = await userEditGetApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//user Edit Post
export const userEditPost = createAsyncThunk(
  "admin/userEditPost",
  async (data, thunkAPI) => {
    try {
      const response = await userEditPostApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//delete
export const deleteUser = createAsyncThunk(
  "admin/deleteUsers",
  async (data, thunkAPI) => {
    try {
      const response = await userDeleteApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to delete user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(userList.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userLists = action.payload;
      })
      .addCase(userList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //add user
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.users = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //staus user
      .addCase(userStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.users = action.payload;
      })
      .addCase(userStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //userEditGet
      .addCase(userEditGet.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userEditGet.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.user = action.payload;
      })
      .addCase(userEditGet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //post edit user
      .addCase(userEditPost.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userEditPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.user = action.payload;
      })
      .addCase(userEditPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.user = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
