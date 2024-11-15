
import {
    allFontFamily, newFontFamily, updateFontFamilyById, removeFamily
  } from '../request';

export const getAllFontFamily = (search: string, page: number, limit: number) => async (dispatch: any) => {
    try {
        dispatch({ type: 'fontFamily/getAllFontFamilyRequest' });
        const { data } = await allFontFamily(search, page, limit );

        dispatch({ type: 'fontFamily/getAllFontFamilySuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "fontFamily/getAllFontFamilyFail", payload: message });
        return message
    }
};

export const createFontFamily = (createdFontFamily: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'fontFamily/createFontFamilyRequest' });
        const { data } = await newFontFamily(createdFontFamily);
        dispatch({ type: 'fontFamily/createFontFamilySuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "fontFamily/createFontFamilyFail", payload: message });
        return message
    }
}

export const updateFontFamily = (updatedFontFamily: any) => async (dispatch: any) => {
    try {

        dispatch({ type: 'fontFamily/updateFontFamilyRequest' });
        const { data } = await updateFontFamilyById(updatedFontFamily.id, updatedFontFamily);

        dispatch({ type: 'fontFamily/updateFontFamilySuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "fontFamily/updateFontFamilyFail", payload: message });
        return message
    }
}



export const deleteFontFamily = (id: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'fontFamily/deleteFontFamilyRequest' });
        const { data } = await removeFamily(id);
        dispatch({ type: 'fontFamily/deleteFontFamilySuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "fontFamily/deleteFontFamilyFail", payload: message });
        return message
    }
};

