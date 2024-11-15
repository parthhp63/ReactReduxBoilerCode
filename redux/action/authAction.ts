import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  register,
  logout,
  user,
  forgotPassword,
  resetPassword,
  ChangePassword
} from '../request';
import { Dispatch } from 'redux';

export const loginAsync = (userData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: 'auth/loginRequest' });
    const { data } = await login(userData.email, userData.password);
    dispatch({ type: 'auth/loginSuccess', payload: data });

    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Login failed';
    dispatch({ type: 'auth/loginFail', payload: message });
    return message;
  }
};

export const registerAsync = (registerData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: 'auth/registerRequest' });
    const { data } = await register(
      registerData.email,
      registerData.firstName,
      registerData.lastName,
      registerData.password,
      registerData.confirmPassword
    );
    dispatch({ type: 'auth/registerSuccess', payload: data });
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Registration failed';
    dispatch({ type: 'auth/registerFail', payload: message });
    return message;
  }
};

export const logoutAsync = () => async (dispatch: any) => {
  try {
    dispatch({ type: 'auth/logoutRequest' });
    const { data } = await logout();

    dispatch({ type: 'auth/logoutSuccess', payload: data });
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message;
    dispatch({ type: 'auth/logoutFail', payload: message });
    return message;
  }
};

export const getUserAsync = () => async (dispatch: any) => {
  try {
    dispatch({ type: 'auth/getUserRequest' });
    const { data } = await user();
    dispatch({ type: 'auth/getUserSuccess', payload: data });
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message;
    dispatch({ type: 'auth/getUserFail', payload: message });
    return message;
  }
};

export const forgotPasswordAsync = (userData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: 'auth/forgotPasswordRequest' });
    const { data } = await forgotPassword(userData.email);
    dispatch({ type: 'auth/forgotPasswordSuccess', payload: data });

    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Login failed';
    dispatch({ type: 'auth/forgotPasswordFail', payload: message });
    return message;
  }
};

export const resetPasswordAsync = (userData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: 'auth/resetPasswordRequest' });
    const { data } = await resetPassword(
      userData.token,
      userData.password,
      userData.confirmPassword
    );
    dispatch({ type: 'auth/resetPasswordSuccess', payload: data });

    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Login failed';
    dispatch({ type: 'auth/resetPasswordFail', payload: message });
    return message;
  }
};

export const changePasswordAsync =
  (changePassword: any) => async (dispatch: any) => {
    try {
      dispatch({ type: 'user/changePasswordRequest' });
      const { data } = await ChangePassword(
        changePassword.oldPassword,
        changePassword.newPassword,
        changePassword.confirmPassword
      );
      dispatch({ type: 'user/changePasswordSuccess', payload: data });
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch({ type: 'user/changePasswordFail', payload: message });
      return message;
    }
  };
