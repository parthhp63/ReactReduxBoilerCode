import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allFontFamily: null,
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
};
export const FontFamily = createSlice({
    name: "fontFamily",
    initialState,
    reducers: {
        getAllFontFamilyRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getAllFontFamilySuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.allFontFamily = action.payload;
            // state.message = action.payload.message;
        },
        getAllFontFamilyFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        createFontFamilyRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        createFontFamilySuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        createFontFamilyFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        updateFontFamilyRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        updateFontFamilySuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        updateFontFamilyFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        deleteFontFamilyRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        deleteFontFamilySuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        deleteFontFamilyFail: (state, action) => {
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
    getAllFontFamilyRequest,
    getAllFontFamilySuccess,
    getAllFontFamilyFail,

    createFontFamilyRequest,
    createFontFamilySuccess,
    createFontFamilyFail,

    updateFontFamilyRequest,
    updateFontFamilySuccess,
    updateFontFamilyFail,

    deleteFontFamilyRequest,
    deleteFontFamilySuccess,
    deleteFontFamilyFail,

    clearError,
    clearMessage,
} = FontFamily.actions;
export default FontFamily.reducer;











