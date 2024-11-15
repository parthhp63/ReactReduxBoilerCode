import {
    allColors,
    createColors,
    updateColorById,
    removeColor
  } from '../request';


  export const getAllcolor = (search: string, page: number, limit: number,status:any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'color/getcolorsSizeRequest' });
        const { data } = await allColors(search, page, limit,status);
      
        dispatch({ type: 'color/getcolorsSizeSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "color/getcolorsSizeFail", payload: message });
        return message
    }
};
export const createColor = (createdColor: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'color/createCreateColorRequest' });
        const { data } = await createColors(createdColor);
        dispatch({ type: 'color/createCreateColorSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "color/createCreateColorFail", payload: message });
        return message
    }
}

export const updateColor = (updatedColor: any) => async (dispatch: any) => {
    try {
      
        dispatch({ type: 'color/updateColorRequest' });
        const { data } = await updateColorById(updatedColor.id, updatedColor);
    
        dispatch({ type: 'color/updateColorSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "color/updateColorFail", payload: message });
        return message
    }
}

export const deleteColor = (id: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'color/deleteColorRequest' });
        const { data } = await removeColor(id);
        dispatch({ type: 'color/deleteColorSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "color/deleteColorFail", payload: message });
        return message
    }
};