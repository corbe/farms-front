import { createSlice } from "@reduxjs/toolkit";
import { getAreas, addAreas, updateAreas, deleteAreas} from "./areasApi";

export const areasSlice = createSlice({
    name: "areas",
    initialState: {
        list: {
            isLoading: false,
            status: "",
            values: []
        },
        save: {
            isSaving: false,
            isDeleting: false
        }
    },
    reducers: {
        clearSuccessMessage: (state, payload) => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: {
        [getAreas.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getAreas.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getAreas.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        },
        [addAreas.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [addAreas.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [addAreas.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateAreas.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [updateAreas.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateAreas.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [deleteAreas.pending.type]: (state, action) => {
            state.save.isDeleting = true
        },
        [deleteAreas.fulfilled.type]: (state, action) => {
            state.save.isDeleting = false
        },
        [deleteAreas.rejected.type]: (state, action) => {
            state.save.isDeleting = false
        }
    }
})

export default areasSlice.reducer