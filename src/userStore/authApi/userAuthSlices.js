import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authUserLoginApi,
  userRegisterApi,
  authUserLogoutApi,
} from "./userAuthApiServices";

const initialState = {
  loading: false,
  error: "",
  authUserData: null,
  userData: null,
};

//register
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (credentials, thunkAPI) => {
    try {
      const response = await userRegisterApi(credentials);
      return response; // Assuming `response` contains token or user data
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
      const response = await authUserLogoutApi();
      return response;
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
      .addCase(AuthLogout.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AuthLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authUserData = action.payload;
      })
      .addCase(AuthLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
