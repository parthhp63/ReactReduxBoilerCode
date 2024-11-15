import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
  authToken: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  message: null,

  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    //   state.authToken = null;
    // },
    loginRequest: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    loginFail: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    registerRequest: (state) => {
      state.status = 'loading';
    },
    registerSuccess: (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload;
    },
    registerFail: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    forgotPasswordRequest: (state) => {
      state.status = 'loading';
    },
    forgotPasswordSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = false;

      state.message = action.payload;
    },
    forgotPasswordFail: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    resetPasswordRequest: (state) => {
      state.status = 'loading';
    },
    resetPasswordSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = false;

      state.message = action.payload;
    },
    resetPasswordFail: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.status = 'loading';
    },
    logoutSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = null;
      state.isAuthenticated = false;

      state.message = action.payload.message;
    },
    logoutFail: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },

    getUserRequest: (state) => {
      state.status = 'loading';
    },
    getUserSuccess: (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload, action.payload.user.token, 'action.payload');
      state.user = action.payload;
      state.authToken = action.payload.user.token;
      state.isAuthenticated = true;
      // state.message = action.payload.message;
    },
    getUserFail: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    changePasswordRequest: (state) => {
      state.status = 'loading';
    },
    changePasswordSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    changePasswordFail: (state, action) => {
      state.status = 'failed';
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    }
  }
});

// export const { logout, clearError, clearMessage } = authSlice.actions;
export const {
  loginRequest,
  loginSuccess,
  loginFail,

  registerRequest,
  registerSuccess,
  registerFail,

  logoutRequest,
  logoutSuccess,
  logoutFail,

  getUserRequest,
  getUserSuccess,
  getUserFail,

  clearError,
  clearMessage
} = authSlice.actions;
export default authSlice.reducer;
