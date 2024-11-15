import { Dispatch } from 'redux';
import {
  userRequest,
  userSuccess,
  userFail,
  userProfileRequest,
  userProfileSuccess,
  userProfileFail,
  updateUserSettingsRequest,
  updateUserSettingsSuccess,
  updateUserSettingsFail,
  getUserSettingsRequest,
  getUserSettingsSuccess,
  getUserSettingsFail,

  
} from '../reducer/userReducer';
import { updateUserProfile, updateUserAvatar,allUser,removeUser,getUserById,
  updateUserById,getRoles, 
  basicSettings,
  getBasicSettings} from '../request';

export const updateUserAsync =
  (updatedUser: any) => async (dispatch: Dispatch) => {
    try {
      dispatch(userRequest()); // Use the action creator directly
      const { data } = await updateUserProfile(updatedUser._id, updatedUser);
      dispatch(userSuccess(data)); // Use the action creator directly
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch(userFail(message)); // Use the action creator directly
      return message;
    }
  };

export const updateAvatarAsync =
  (userId: string, avatarFile: File) => async (dispatch: Dispatch) => {
    try {
      dispatch(userProfileRequest()); // Use the action creator directly
      const { data } = await updateUserAvatar(userId, avatarFile);
      dispatch(userProfileSuccess(data)); // Use the action creator directly
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch(userProfileFail(message)); // Use the action creator directly
      return message;
    }
  };


  export const getAllUser = (search: string, page: number, limit: number) => async (dispatch: any) => {
    try {
      dispatch({ type: 'user/getAllUserRequest' });
      const { data } = await allUser(search, page, limit);
      dispatch({ type: 'user/getAllUserSuccess', payload: data });
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch({ type: "user/getAllUserFail", payload: message });
      return message
    }
  };
  
  export const deleteUser = (id: any) => async (dispatch: any) => {
    try {
      dispatch({ type: 'user/deleteUserRequest' });
      const { data } = await removeUser(id);
      dispatch({ type: 'user/deleteUserSuccess', payload: data });
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch({ type: "user/deleteUserFail", payload: message });
      return message
    }
  };
  
  export const getUser = (id: any) => async (dispatch: any) => {
    try {
      dispatch({ type: 'user/getUserByIdRequest' });
      const { data } = await getUserById(id);
      dispatch({ type: 'user/getUserByIdSuccess', payload: data });
      return data;
  
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch({ type: "user/getUserByIdFail", payload: message });
      return message
    }
  }
  
  export const updateUser = (updatedUser: any) => async (dispatch: any) => {
    try {
      dispatch({ type: 'user/updateUserRequest' });
      const { data } = await updateUserById(updatedUser.id, updatedUser);
      dispatch({ type: 'user/updateUserSuccess', payload: data });
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch({ type: "user/updateUserFail", payload: message });
      return message
    }
  }
  export const getAllRoles = () => async (dispatch: any) => {
    try {
      dispatch({ type: 'user/getAllRolesRequest' });
      const { data } = await getRoles();
      dispatch({ type: 'user/getAllRolesSuccess', payload: data });
      return data;
  
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch({ type: "user/getAllRolesFail", payload: message });
      return message
    }
  }

  export const updateUserSettings = (updatedSettings: any) => async (dispatch: Dispatch) => {
    try {
      dispatch(updateUserSettingsRequest()); // Use the action creator directly
      const { data } = await basicSettings(updatedSettings);
      dispatch(updateUserSettingsSuccess(data)); // Use the action creator directly
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      dispatch(updateUserSettingsFail(message)); // Use the action creator directly
      return message;
    }
  }


  export  const getUserSettings =  () => async (dispatch: Dispatch) => {
    try {
      dispatch(getUserSettingsRequest());
      const { data } = await getBasicSettings();
      dispatch(getUserSettingsSuccess(data));
      return data;
      } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch(getUserSettingsFail(message));
        return message;
      }
      }


  