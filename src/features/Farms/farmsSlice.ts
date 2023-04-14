import { createSlice } from "@reduxjs/toolkit";
import { getFarms, addFarms, updateFarms, deleteFarms} from "./farmsApi";

export const farmsSlice = createSlice({
    name: "farms",
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

        }
    },
    extraReducers: {
        [getFarms.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getFarms.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getFarms.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        },
        [addFarms.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [addFarms.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [addFarms.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateFarms.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [updateFarms.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateFarms.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [deleteFarms.pending.type]: (state, action) => {
            state.save.isDeleting = true
        },
        [deleteFarms.fulfilled.type]: (state, action) => {
            state.save.isDeleting = false
        },
        [deleteFarms.rejected.type]: (state, action) => {
            state.save.isDeleting = false
        }
    }
})

export default farmsSlice.reducer