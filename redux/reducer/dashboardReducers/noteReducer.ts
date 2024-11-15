import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allNotes: null,
    allSharedNotes: null,
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
    allNotesList: null,
    singleNote: null
};
export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {


        createNoteRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        createNoteSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        createNoteFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        getAllNotesRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getAllNotesSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.allNotes = action.payload;
        },
        getAllNotesFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        getAllNotesListRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getAllNotesListSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.allNotesList = action.payload;
        },
        getAllNotesListFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        getNoteByIdRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getNoteByIdSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.singleNote = action.payload;
        },
        getNoteByIdFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        updateNoteRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        updateNoteSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        updateNoteFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        deleteNoteRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        deleteNoteSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        deleteNoteFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        deleteAllNotesRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        deleteAllNotesSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        deleteAllNotesFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        restoreAllNotesRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        restoreAllNotesSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        restoreAllNotesFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        shareNoteRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        shareNoteSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        shareNoteFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        getAllSharedNotesRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        getAllSharedNotesSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.allSharedNotes = action.payload;
        },
        getAllSharedNotesFail: (state, action) => {
            state.status = "failed";
            state.loading = false;
            state.error = action.payload;
        },

        deleteShareNoteRequest: (state) => {
            state.status = "loading";
            state.loading = true;
        },
        deleteShareNoteSuccess: (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.message = action.payload;
            // state.message = action.payload.message;
        },
        deleteShareNoteFail: (state, action) => {
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
    createNoteRequest,
    createNoteSuccess,
    createNoteFail,

    getAllNotesRequest,
    getAllNotesSuccess,
    getAllNotesFail,

    getAllNotesListRequest,
    getAllNotesListSuccess,
    getAllNotesListFail,

    getNoteByIdRequest,
    getNoteByIdSuccess,
    getNoteByIdFail,

    deleteAllNotesRequest,
    deleteAllNotesSuccess,
    deleteAllNotesFail,

    restoreAllNotesRequest,
    restoreAllNotesSuccess,
    restoreAllNotesFail,

    deleteNoteRequest,
    deleteNoteSuccess,
    deleteNoteFail,

    shareNoteRequest,
    shareNoteSuccess,
    shareNoteFail,

    getAllSharedNotesRequest,
    getAllSharedNotesSuccess,
    getAllSharedNotesFail,

    deleteShareNoteRequest,
    deleteShareNoteSuccess,
    deleteShareNoteFail,

    clearError,
    clearMessage,
} = noteSlice.actions;
export default noteSlice.reducer;











