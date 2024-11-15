import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allTabs: null,
    tabDetails: null,
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
};
export const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        getAllTabRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getAllTabSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.allTabs = action.payload;
            // state.message = action.payload.message;
        },
        getAllTabFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        createTabRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        createTabSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        createTabFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        updateTabRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        updateTabSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        updateTabFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        deleteTabRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        deleteTabSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        deleteTabFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        getTabByIdRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getTabByIdSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.tabDetails = action.payload;
            // state.message = action.payload.message;
        },
        getTabByIdFail: (state, action) => {
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
    getAllTabRequest,
    getAllTabSuccess,
    getAllTabFail,

    createTabRequest,
    createTabSuccess,
    createTabFail,

    updateTabRequest,
    updateTabSuccess,
    updateTabFail,

    getTabByIdRequest,
    getTabByIdSuccess,
    getTabByIdFail,

    deleteTabRequest,
    deleteTabSuccess,
    deleteTabFail,

    clearError,
    clearMessage,
} = tabSlice.actions;
export default tabSlice.reducer;











