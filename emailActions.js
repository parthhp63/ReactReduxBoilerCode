// src/redux/actions/emailActions.js
export const loadEmails = () => async (dispatch) => {
  try {
    dispatch({ type: 'email/loadEmailsRequest' });
    const emails = JSON.parse(localStorage.getItem("emailList")) || [];
    dispatch({ type: 'email/loadEmailsSuccess', payload: emails });
  } catch (error) {
    dispatch({ type: 'email/loadEmailsFail', payload: error.message });
  }
};

export const addEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'email/addEmailRequest' });
    const currentEmails = JSON.parse(localStorage.getItem("emailList")) || [];
    const updatedEmails = [...currentEmails, email];
    localStorage.setItem("emailList", JSON.stringify(updatedEmails));
    dispatch({ type: 'email/addEmailSuccess', payload: updatedEmails });
  } catch (error) {
    dispatch({ type: 'email/addEmailFail', payload: error.message });
  }
};

export const removeEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'email/removeEmailRequest' });
    const currentEmails = JSON.parse(localStorage.getItem("emailList")) || [];
    const updatedEmails = currentEmails.filter(e => e !== email);
    localStorage.setItem("emailList", JSON.stringify(updatedEmails));
    dispatch({ type: 'email/removeEmailSuccess', payload: updatedEmails });
  } catch (error) {
    dispatch({ type: 'email/removeEmailFail', payload: error.message });
  }
};
