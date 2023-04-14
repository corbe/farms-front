import { createSlice } from "@reduxjs/toolkit";
import { getProducers, addProducers, updateProducers, deleteProducers} from "./producersApi";

export const producersSlice = createSlice({
    name: "producers",
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
        [getProducers.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getProducers.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getProducers.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        },
        [addProducers.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [addProducers.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [addProducers.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateProducers.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [updateProducers.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateProducers.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [deleteProducers.pending.type]: (state, action) => {
            state.save.isDeleting = true
        },
        [deleteProducers.fulfilled.type]: (state, action) => {
            state.save.isDeleting = false
        },
        [deleteProducers.rejected.type]: (state, action) => {
            state.save.isDeleting = false
        }
    }
})

export default producersSlice.reducer