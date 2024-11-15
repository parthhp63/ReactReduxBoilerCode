import axios from 'axios';
const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/create/user`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const getUser_URL = `${API_URL}/me`;

export const forgotPassword_URL = `${API_URL}/forgot-password`;
export const resetPassword_URL = `${API_URL}/reset-password`;
export const changePassword_URL = `${API_URL}/change/password`;

export const updateUserAvatar_URL = `${API_URL}/upload/user/avatar/:userId `;
export const updateUserProfile_URL = `${API_URL}/update/user/:userId`;
export const getAllUser_URL = `${API_URL}/get/all/users`;

export const updateUserSettingsAsync_URL = `${API_URL}/change/basic-settings`;

export const getUserSettingsAsync_URL = `${API_URL}/basic-settings`;



export function login(email: string, password: string) {
  return axios.post(
    LOGIN_URL,
    {
      email,
      password
    },
    {
      withCredentials: true
    }
  );
}

export function register(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
) {
  return axios.post(
    REGISTER_URL,
    {
      email,
      firstName: firstName,
      lastName: lastName,
      password,
      confirmPassword: confirmPassword
    } 
  );
}

export function logout() {
  return axios.get(LOGOUT_URL, {
    withCredentials: true
  });
}
export function user() {
  return axios.get(getUser_URL, {
    withCredentials: true
  });
}
export function forgotPassword(email: string) {
  return axios.post(
    forgotPassword_URL,
    {
      email
    }

  );
}

export function resetPassword(
  token: string,
  password: string,
  confirmPassword: string
) {
  return axios.put(
    resetPassword_URL,
    {
      token,
      password,
      confirmPassword
    }
 
  );
}

export function ChangePassword(
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  return axios.put(
    changePassword_URL,
    {
      oldPassword,
      newPassword,
      confirmPassword
    },
    {
      withCredentials: true
    }
  );
}

export function updateUserAvatar(userId: string, avatarFile: File) {
  const formData: any = new FormData();
  formData.append('file', avatarFile);

  return axios.put(updateUserAvatar_URL.replace(':userId', userId), formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // Ensure correct content type for file uploads
    },
    withCredentials: true
  });
}

export function updateUserProfile(userId: string, profile: any) {
  return axios.put(updateUserProfile_URL.replace(':userId', userId), profile, {
    withCredentials: true
  });
}
// users

export function allUser(search: string, page: number, limit: number) {
  return axios.get(getAllUser_URL, {
    params: {
      search,
      page,
      limit
    },
    withCredentials: true
  });
}

export function removeUser(id: any) {
  const url = `${API_URL}/update/user/${id}`;
  return axios.delete(url, {
    withCredentials: true
  });
}


export function getUserById(id: any) {
  const url = `${API_URL}/get/user/${id}`;
  return axios.get(url, {
    withCredentials: true
  });
}

export function updateUserById(id: string, updatedUser: any) {
  const url = `${API_URL}/update/user/${id}`;
  return axios.put(url, updatedUser, {
    withCredentials: true
  });
}

export function getRoles() {
  const url = `${API_URL}/get/all/roles`;
  return axios.get(url, {
    withCredentials: true
  });
}

//Plans ...................
export function allPlan(search: string, page: number, limit: number) {
  const url = `${API_URL}/get/all/plans`;
  return axios.get(url, {
    params: {
      search,
      page,
      limit
    },
    withCredentials: true
  });
}

export function createPlans(createdPlan: any) {
  const url = `${API_URL}/add/plan`;
  return axios.post(url, createdPlan, {
    withCredentials: true
  });
}

export function removePlan(id: any) {
  const url = `${API_URL}/update/plan/${id}`;
  return axios.delete(url, {
    withCredentials: true
  });
}

export function getPlan(id: any) {
  const url = `${API_URL}/get/plan/${id}`;
  return axios.get(url, {
    withCredentials: true
  });
}

export function updatePlanById(id: string, updatedPlan: any) {

  const url = `${API_URL}/update/plan/${id}`;
  return axios.put(url, updatedPlan, {
    withCredentials: true
  });
}

// Color

export function allColors(search: string, page: number, limit: number, status: any) {
  const url = `${API_URL}/get/all/notes/backgroud/color`;
  return axios.get(url, {
    params: {
      search,
      page,
      limit,
      ...status.reduce((acc: any, val: any, index: any) => {
        acc[`status[${index}]`] = val;
        return acc;
      }, {}),
    },
    withCredentials: true
  });
}

export function createColors(createdColor: any) {
  const url = `${API_URL}/create/notes/backgroud/color`;
  return axios.post(url, createdColor, {
    withCredentials: true
  });
}

export function updateColorById(id: any, bodyData: any) {
  const url = `${API_URL}/update/notes/backgroud/color/${id}`;
  return axios.put(url, bodyData, {
    withCredentials: true
  });
}

export function removeColor(id: any) {
  const url = `${API_URL}/update/notes/backgroud/color/${id}`;
  return axios.delete(url, {
    withCredentials: true
  });
}



// Font Size
export function allFontSize(search: string, page: number, limit: number) {
  const url = `${API_URL}/get/all/font/size`;
  return axios.get(url, {
    params: {
      search,
      page,
      limit
    },
    withCredentials: true
  });
}


export function createFontSizes(createdFontSize: any) {
  const url = `${API_URL}/create/font/size`;
  return axios.post(url, createdFontSize, {
    withCredentials: true
  });
}

export function updateFontSizeById(id: any, bodyData: any) {
  const url = `${API_URL}/update/font/size/${id}`;
  return axios.put(url, bodyData, {
    withCredentials: true
  });
}

export function removeSize(id: any) {
  const url = `${API_URL}/update/font/size/${id}`;
  return axios.delete(url, {
    withCredentials: true
  });
}


// Font Family
export function allFontFamily(search: string, page: number, limit: number) {
  const url = `${API_URL}/get/all/font/family`;
  return axios.get(url, {
    params: {
      search,
      page,
      limit,
      
    },
    withCredentials: true
  });
}

export function newFontFamily(createdFontFamily: any) {
  const url = `${API_URL}/create/font/family`;
  return axios.post(url, createdFontFamily, {
    withCredentials: true
  });
}

export function updateFontFamilyById(id: any, bodyData: any) {
  const url = `${API_URL}/update/font/family/${id}`;
  return axios.put(url, bodyData, {
    withCredentials: true
  });
}

export function removeFamily(id: any) {
  const url = `${API_URL}/update/font/family/${id}`;
  return axios.delete(url, {
    withCredentials: true
  });
}

// Notes Dashboard


// notes
export function addNote(
  title:any,tabId:string,description:any,titleColor:any, noteColor:any
) {
  const url = `${API_URL}/create/note`;
  return axios.post(
    url,
    {
      title,
      tabId,
      description,
      titleColor,
       noteColor
    },
    {
      withCredentials: true
    }
  );
}

export function allNotes(tabId: any , page : any , limit : any) {
  const url = `${API_URL}/get/all/notes/${tabId}`;
  return axios.get(url, {
    params: {
      page,
      limit
    },
    withCredentials: true
  });
}

export function getNotesById(noteId: any) {
  const url = `${API_URL}/get/note/${noteId}`;
  return axios.get(url, {
    withCredentials: true
  });
}

export function updateNoteById(noteId: any, bodyData: any) {
  const url = `${API_URL}/update/note/${noteId}`;
  return axios.put(url, bodyData, {
    withCredentials: true
  });
}

export function allNotesList(page: number, limit: number, search: string) {
  return axios.get(`${API_URL}/get/all/notes`, {
    params: {
      page,
      limit,
      search
    },
    withCredentials: true
  });
}

export function removeNote(id: any) {
  const url = `${API_URL}/update/note/${id}`;
  return axios.delete(url, {
    withCredentials: true
  });
}

export function removeAllNotes(bodyData: any) {
  const url = `${API_URL}/deleteAll/notes/`;
  return axios.delete(url, {
    data: bodyData,
    withCredentials: true
  });
}

export function restoreNotes(bodyData: any) {
  const url = `${API_URL}/restoreAll/notes`;
  return axios.put(url, bodyData, {
    withCredentials: true
  });
}


export function shateNoteByMail(bodyData: any) {
  const url = `${API_URL}/shareNote/sendEmail`;
  return axios.post(url, bodyData, {
    withCredentials: true
  });
}

export function allSharedNotes(page: number, limit: number, search: string) {
  return axios.get(`${API_URL}/shareNote/List`, {
    params: {
      page,
      limit,
      search
    },
    withCredentials: true
  });
}

export function removeShareNote(id: any) {
  const url = `${API_URL}/shareNote/deleteShare/${id}`;
  return axios.delete(url, {
    withCredentials: true
  });
}

// Tabs

// tab

export function allTab(page: any , limit: any) {
  const url = `${API_URL}/get/all/tabs`;
  return axios.get(url, {
    params: {
      page,
      limit
    },
    withCredentials: true
  });
}

// Server should return AuthModel
export function addTab(bodyData: any) {
  const url = `${API_URL}/create/tab`;
  return axios.post(url, bodyData, {
    withCredentials: true
  });
}

export function removeTab(id: any) {
  const url = `${API_URL}/update/tab/${id}`;
  return axios.delete(url, {
    withCredentials: true
  });
}

export function updateTabById(id: any, bodyData: any) {
  const url = `${API_URL}/update/tab/${id}`;
  return axios.put(url, bodyData, {
    withCredentials: true
  });
}

export function tabById(id : any) {
  const url = `${API_URL}/get/tab/${id}`;
  return axios.get(url, {
    withCredentials: true
  });
}




export function basicSettings(bodyData: any) {
  return axios.put(updateUserSettingsAsync_URL, bodyData, {
    withCredentials: true
  });
}

export function  getBasicSettings()
{
  return axios.get(getUserSettingsAsync_URL, {
    withCredentials: true
  });
}