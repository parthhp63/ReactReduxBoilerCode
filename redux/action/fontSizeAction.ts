
import { allFontSize,createFontSizes,updateFontSizeById,removeSize } from '../request';


export const getAllFontSize = (search: string, page: number, limit: number) => async (dispatch: any) => {
    try {
        dispatch({ type: 'fontSize/getAllFontSizeRequest' });
        const { data } = await allFontSize(search, page, limit);
      
        dispatch({ type: 'fontSize/getAllFontSizeSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "fontSize/getAllFontSizeFail", payload: message });
        return message
    }
};

export const createFontSize = (createdFontSize: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'fontSize/createFontSizeRequest' });
        const { data } = await createFontSizes(createdFontSize);
        dispatch({ type: 'fontSize/createFontSizeSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "fontSize/createFontSizeFail", payload: message });
        return message
    }
}

export const updateFontSize = (updatedFontSize: any) => async (dispatch: any) => {
    try {
      
        dispatch({ type: 'fontSize/updateFontSizeRequest' });
        const { data } = await updateFontSizeById(updatedFontSize.id, updatedFontSize);
    
        dispatch({ type: 'fontSize/updateFontSizeSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "fontSize/updateFontSizeFail", payload: message });
        return message
    }
}



export const deleteFontSize = (id: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'fontSize/deleteFontSizeRequest' });
        const { data } = await removeSize(id);
        dispatch({ type: 'fontSize/deleteFontSizeSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "fontSize/deleteFontSizeFail", payload: message });
        return message
    }
};