import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authLoginApi,
  authLogoutApi,
  adminAuthApi,
  adminProfileUpdateApi,
  adminChangePassApi,
  forgotPasswordApi,
  resetPasswordPostApi
} from "./authApiServices";

const initialState = {
  loading: false,
  error: "",
  authData: null,
  adminProfileData: [],
  adminProfileUpdate: [],
  adminChangePass: [],
  token: [],
  linkToken: [],
  changedPassword:[]
};

export const AuthLogin = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await authLoginApi(credentials);
      return response; // Assuming `response` contains token or user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const AuthLogout = createAsyncThunk(
  "auth/logout",
  async (credentials, thunkAPI) => {
    try {
      const response = await authLogoutApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//admin profile
export const adminAuth = createAsyncThunk(
  "user/userAuth",
  async (data, thunkAPI) => {
    try {
      const response = await adminAuthApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//personal info edit
export const adminProfileUpdate = createAsyncThunk(
  "admin/userProfileUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await adminProfileUpdateApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//password edit
export const adminChangePassword = createAsyncThunk(
  "admin/userChangePassword",
  async (data, thunkAPI) => {
    try {
      const response = await adminChangePassApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);


//post forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const response = await forgotPasswordApi(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//post forgot password
export const resetPasswordPost = createAsyncThunk(
  "auth/ressetPasswordPost",
  async (data, thunkAPI) => {
    try {
      const response = await resetPasswordPostApi(data);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AuthLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AuthLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = action.payload;
      })
      .addCase(AuthLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Logout
      .addCase(AuthLogout.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AuthLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authData = action.payload;
      })
      .addCase(AuthLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //auth profile
      .addCase(adminAuth.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adminAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.adminProfileData = action.payload;
      })
      .addCase(adminAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //auth profile update
      .addCase(adminProfileUpdate.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adminProfileUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.adminProfileUpdate = action.payload;
      })
      .addCase(adminProfileUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //auth password update
      .addCase(adminChangePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adminChangePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.adminChangePass = action.payload;
      })
      .addCase(adminChangePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
       //forgot-password
       .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.token = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //reset-password link get
      .addCase(resetPasswordPost.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(resetPasswordPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.changedPassword = action.payload;
      })
      .addCase(resetPasswordPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
