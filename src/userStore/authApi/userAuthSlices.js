import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authUserLoginApi,
  userRegisterApi,
  authUserLogoutApi,
  userAuthApi,
  userProfileUpdateApi,
  userChangePassApi,
  userForgotPasswordApi,
  userresetPassPostApi,
} from "./userAuthApiServices";

const initialState = {
  loading: false,
  error: "",
  authUserData: null,
  userData: null,
  userProfileData: [],
  userProfileUpdate: [],
  userChangePass: [],
  userToken: [],
  userLinkToken: [],
  userChangedPassword: [],
};

//register
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (credentials, thunkAPI) => {
    try {
      const response = await userRegisterApi(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//login user
export const AuthUserLogin = createAsyncThunk(
  "auth/userLogin",
  async (credentials, thunkAPI) => {
    try {
      const response = await authUserLoginApi(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userAuthLogout = createAsyncThunk(
  "auth/logout",
  async (credentials, thunkAPI) => {
    try {
      const response = await authUserLogoutApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//user profile
export const userAuth = createAsyncThunk(
  "user/userAuth",
  async (data, thunkAPI) => {
    try {
      const response = await userAuthApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//personal info edit
export const userProfileUpdate = createAsyncThunk(
  "admin/userProfileUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await userProfileUpdateApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//password edit
export const userChangePassword = createAsyncThunk(
  "admin/userChangePassword",
  async (data, thunkAPI) => {
    try {
      const response = await userChangePassApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? "Failed to add user"
      );
    }
  }
);

//post forgot password
export const userForgotPassword = createAsyncThunk(
  "auth/userForgotPassword",
  async (data, thunkAPI) => {
    try {
      const response = await userForgotPasswordApi(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//post forgot password
export const userResetPasswordPost = createAsyncThunk(
  "auth/resetUserPasswordPost",
  async (data, thunkAPI) => {
    try {
      const response = await userresetPassPostApi(data);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //register
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userData = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login
      .addCase(AuthUserLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AuthUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authUserData = action.payload;
      })
      .addCase(AuthUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Logout
      .addCase(userAuthLogout.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userAuthLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authUserData = action.payload;
      })
      .addCase(userAuthLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //auth profile
      .addCase(userAuth.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userProfileData = action.payload;
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //auth profile update
      .addCase(userProfileUpdate.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userProfileUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userProfileUpdate = action.payload;
      })
      .addCase(userProfileUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //auth password update
      .addCase(userChangePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userChangePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userChangePass = action.payload;
      })
      .addCase(userChangePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //forgot-password
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userToken = action.payload;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //reset-password link get
      .addCase(userResetPasswordPost.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userResetPasswordPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userChangedPassword = action.payload;
      })
      .addCase(userResetPasswordPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
