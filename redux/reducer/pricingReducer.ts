import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allPlans: null,
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
    selectedPlan:null
};
export const planSlice = createSlice({
    name: "plan",
    initialState,
    reducers: {
        getAllPlanRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getAllPlanSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.allPlans = action.payload;
            // state.message = action.payload.message;
        },
        getAllPlanFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        getPlanByIdRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getPlanByIdSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.selectedPlan = action.payload.plan;
            // state.message = action.payload.message;
        },
        getPlanByIdFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        deletePlanRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        deletePlanSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload.message;
        },
        deletePlanFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        updatePlanRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },

        updatePlanSuccess: (state, action) => { 
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },

        updatePlanFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        // updatePlanAvtarRequest: (state) => {
        //     state.status = "loading";
        //     state.loading = true;
        // },

        // updatePlanAvtarSuccess: (state, action) => {
        //     state.status = "succeeded";
        //     state.loading = false;
        //     state.message = action.payload;
        //     // state.message = action.payload.message;
        // },

        // updatePlanAvtarFail: (state, action) => {
        //     state.status = "failed";
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        createPlanRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },

        createPlanSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },

        createPlanFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },



        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
});
// export const { logout, clearError, clearMessage } = authSlice.actions;
export const {
    getAllPlanRequest,
    getAllPlanSuccess,
    getAllPlanFail,

    getPlanByIdRequest,
    getPlanByIdSuccess,
    getPlanByIdFail,

    updatePlanRequest,
    updatePlanSuccess,
    updatePlanFail,

    deletePlanRequest,
    deletePlanSuccess,
    deletePlanFail,

    // updatePlanAvtarRequest,
    // updatePlanAvtarSuccess,
    // updatePlanAvtarFail,
    
    createPlanRequest,
    createPlanSuccess,
    createPlanFail,
    
    clearError,
    clearMessage,
} = planSlice.actions;
export default planSlice.reducer;