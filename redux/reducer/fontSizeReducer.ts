import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allFontSize: null,
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
};
export const fontSize = createSlice({
    name: "fontSize",
    initialState,
    reducers: {
        getAllFontSizeRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getAllFontSizeSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.allFontSize = action.payload;
            // state.message = action.payload.message;
        },
        getAllFontSizeFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        createFontSizeRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        createFontSizeSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        createFontSizeFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        updateFontSizeRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        updateFontSizeSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        updateFontSizeFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        deleteFontSizeRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        deleteFontSizeSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        deleteFontSizeFail: (state, action) => {
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
    getAllFontSizeRequest,
    getAllFontSizeSuccess,
    getAllFontSizeFail,

    createFontSizeRequest,
    createFontSizeSuccess,
    createFontSizeFail,

    updateFontSizeRequest,
    updateFontSizeSuccess,
    updateFontSizeFail,

    deleteFontSizeRequest,
    deleteFontSizeSuccess,
    deleteFontSizeFail,

    clearError,
    clearMessage,
} = fontSize.actions;
export default fontSize.reducer;











