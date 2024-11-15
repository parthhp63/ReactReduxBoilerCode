import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { addNote, allNotes, allNotesList, allSharedNotes, getNotesById,removeAllNotes,removeNote,removeShareNote,removeTab, restoreNotes, shateNoteByMail, updateNoteById } from  '../../request';


export const createNewNote = (userData:any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/createNoteRequest' });
        const { data } = await addNote(
            userData.title,
        userData.tabId, 
        userData.description,
        userData.titleColor,
        userData.noteColor
          );
        // const { data } = await addNote(userData);
          // Check if the response is nested, and flatten it
    const flattenedData = {
        
      };
        dispatch({ type: 'note/createNoteSuccess', payload: flattenedData  });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/createNoteFail", payload: message });
        return message
    }
};

export const getAllNotes = (tabId: any , page : any , limit : any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/getAllNotesRequest' });
        const { data } = await allNotes(tabId , page , limit);
        dispatch({ type: 'note/getAllNotesSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/getAllNotesFail", payload: message });
        return message
    }
};

export const getAllNotesList = (page: number, limit: number, search: string) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/getAllNotesListRequest' });
        const { data } = await allNotesList(page, limit, search);
        dispatch({ type: 'note/getAllNotesListSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/getAllNotesListFail", payload: message });
        return message
    }
};

export const getNoteById = (noteId: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/getNoteByIdRequest' });
        const { data } = await getNotesById(noteId);
        dispatch({ type: 'note/getNoteByIdSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/getNoteByIdFail", payload: message });
        return message
    }
};

export const updateNote = (noteId: any,bodyData: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/updateNoteRequest' });
        const { data } = await updateNoteById(noteId, bodyData);
        dispatch({ type: 'note/updateNoteSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/updateNoteFail", payload: message });
        return message
    }
}

export const deleteNote = (id: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/deleteNoteRequest' });
        const { data } = await removeNote(id);
        dispatch({ type: 'note/deleteNoteSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/deleteNoteFail", payload: message });
        return message
    }
};

export const deleteAllNotes = (bodyData : any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/deleteAllNotesRequest' });
        const { data } = await removeAllNotes(bodyData);
        dispatch({ type: 'note/deleteAllNotesSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/deleteAllNotesFail", payload: message });
        return message
    }
};

export const restoreAllNotes = (bodyData: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/restoreAllNotesRequest' });
        const { data } = await restoreNotes(bodyData);
        dispatch({ type: 'note/restoreAllNotesSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/restoreAllNotesFail", payload: message });
        return message
    }
}

export const shareNote = (bodyData : any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/shareNoteRequest' });
        const { data } = await shateNoteByMail(bodyData);
        dispatch({ type: 'note/shareNoteSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/shareNoteFail", payload: message });
        return message
    }
};

export const getAllSharedNotes = (page: number, limit: number, search: string) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/getAllSharedNotesRequest' });
        const { data } = await allSharedNotes(page, limit, search);
        dispatch({ type: 'note/getAllSharedNotesSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/getAllSharedNotesFail", payload: message });
        return message
    }
};

export const deleteShareNote = (id : any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'note/deleteShareNoteRequest' });
        const { data } = await removeShareNote(id);
        dispatch({ type: 'note/deleteShareNoteSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "note/deleteShareNoteFail", payload: message });
        return message
    }
};