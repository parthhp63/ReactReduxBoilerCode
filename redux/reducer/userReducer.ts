import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  allUsers: null,
  user: null,
  authToken: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  message: null,
  loading: false,
  userDetail: null,
  roles:null,
  userSettings:null,

  isAuthenticated: false
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequest: (state) => {
      state.status = 'loading';
    },
    userSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    userFail: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    userProfileRequest: (state) => {
      state.status = 'loading';
    },
    userProfileSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    userProfileFail: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    getAllUserRequest: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.allUsers = action.payload;
      // state.message = action.payload.message;
    },
    getAllUserFail: (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteUserFail: (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },
    
    getUserByIdRequest: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    getUserByIdSuccess: (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.userDetail = action.payload.user;
    },
    getUserByIdFail: (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },

    updateUserRequest: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.message = action.payload;
    },
    updateUserFail: (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },
    updateUserSettingsRequest: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    updateUserSettingsSuccess: (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.message = action.payload;
    },
    updateUserSettingsFail: (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },
    getUserSettingsRequest: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    getUserSettingsSuccess: (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.userSettings = action.payload;
    },
    getUserSettingsFail: (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },


    getAllRolesRequest: (state) => {
      state.status = "loading";
      state.loading = true;
    },
    getAllRolesSuccess: (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.roles = action.payload.roles;
    },
    getAllRolesFail: (state, action) => {
      state.status = "failed";
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
});

// export const { logout, clearError, clearMessage } = authSlice.actions;
export const {
  userRequest,
  userSuccess,
  userFail,
  userProfileRequest,
  userProfileSuccess,
  userProfileFail,

  getAllUserRequest,
  getAllUserSuccess,
  getAllUserFail,

  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,

  getUserByIdRequest,
  getUserByIdSuccess,
  getUserByIdFail,

  updateUserRequest,
  updateUserSuccess,
  updateUserFail,

  getAllRolesRequest,
  getAllRolesSuccess,
  getAllRolesFail,


  updateUserSettingsRequest,
  updateUserSettingsSuccess,
  updateUserSettingsFail,

  getUserSettingsRequest,
  getUserSettingsSuccess,
  getUserSettingsFail,

} = userSlice.actions;

export default userSlice.reducer;
