import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    allPlan,
    createPlans,
    removePlan,
    getPlan,
    updatePlanById
  } from '../request';
import { Dispatch } from 'redux';

export const getAllPlan = (search: string, page: number, limit: number) => async (dispatch: any) => {
    try {
        dispatch({ type: 'plan/getAllPlanRequest' });
        const { data } = await allPlan(search, page, limit);
      
        dispatch({ type: 'plan/getAllPlanSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "plan/getAllPlanFail", payload: message });
        return message
    }
};

export const getPlanById = (id: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'plan/getPlanByIdRequest' });
        const { data } = await getPlan(id);
        dispatch({ type: 'plan/getPlanByIdSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "plan/getPlanByIdFail", payload: message });
        return message
    }
}

export const deletePlan = (id: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'plan/deletePlanRequest' });
        const { data } = await removePlan(id);
        dispatch({ type: 'plan/deletePlanSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "plan/deletePlanFail", payload: message });
        return message
    }
};


export const updatePlan = (updatedPlan: any) => async (dispatch: any) => {
    try {
      
        dispatch({ type: 'plan/updatePlanRequest' });
        const { data } = await updatePlanById(updatedPlan.id, updatedPlan);
    
        dispatch({ type: 'plan/updatePlanSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "plan/updatePlanFail", payload: message });
        return message
    }
}

// export const updatePlanIcon = (id: any, formData: any) => async (dispatch: any) => {
//     try {
    
//         dispatch({ type: 'plan/updatePlanAvtarRequest' });
//         const { data } = await updatePlanAvtar(id, formData);
     
//         dispatch({ type: 'plan/updatePlanAvtarSuccess', payload: data });
//         return data;
//     } catch (error: any) {
//         const message = error?.response?.data?.message;
//         dispatch({ type: "plan/updatePlanAvtarFail", payload: message });
//         return message
//     }
// }




export const createPlanPricing = (createdPlan: any) => async (dispatch: any) => {
    try {
        dispatch({ type: 'plan/createPlanRequest' });
        const { data } = await createPlans(createdPlan);
        dispatch({ type: 'plan/createPlanSuccess', payload: data });
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message;
        dispatch({ type: "plan/createPlanFail", payload: message });
        return message
    }
}