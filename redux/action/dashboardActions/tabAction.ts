import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { addTab, allTab, removeTab, tabById, updateTabById } from '../../request';
export const getAllTab = (page: any , limit: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'tab/getAllTabRequest' });
        const { data } = await allTab(page , limit);
        dispatch({ type: 'tab/getAllTabSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "tab/getAllTabFail", payload: message });
        return message
    }
};

export const createNewTab = (bodyData: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'tab/createTabRequest' });
        const { data } = await addTab(bodyData);
        dispatch({ type: 'tab/createTabSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "tab/createTabFail", payload: message });
        return message
    }
};

export const deleteTab = (id: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'tab/deleteTabRequest' });
        const { data } = await removeTab(id);
        dispatch({ type: 'tab/deleteTabSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "tab/deleteTabFail", payload: message });
        return message
    }
};

export const updateTab = (id: any, bodyData: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'tab/updateTabRequest' });
        const { data } = await updateTabById(id, bodyData);
        dispatch({ type: 'tab/updateTabSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "tab/updateTabFail", payload: message });
        return message
    }
};

export const getTabById = (id : any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'tab/getTabByIdRequest' });
        const { data } = await tabById(id);
        dispatch({ type: 'tab/getTabByIdSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "tab/getTabByIdFail", payload: message });
        return message
    }
};