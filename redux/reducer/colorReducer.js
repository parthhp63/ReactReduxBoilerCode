import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allColors: null,
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
};
export const color = createSlice({
    name: "color",
    initialState,
    reducers: {
        getcolorsSizeRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getcolorsSizeSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.allColors = action.payload;
            // state.message = action.payload.message;
        },
        getcolorsSizeFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        createCreateColorRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        createCreateColorSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        createCreateColorFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        updateColorRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        updateColorSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        updateColorFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },
        deleteColorRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        deleteColorSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        deleteColorFail: (state, action) => {
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

    getcolorsSizeRequest,
    getcolorsSizeSuccess,
    getcolorsSizeFail,

    createCreateColorRequest,
createCreateColorSuccess,
createCreateColorFail,

updateColorRequest,
updateColorSuccess,
updateColorFail,

deleteColorRequest,
deleteColorSuccess,
deleteColorFail,


    clearError,
    clearMessage,
} = color.actions;
export default color.reducer;