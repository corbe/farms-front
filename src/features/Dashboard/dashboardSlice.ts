import { createSlice } from "@reduxjs/toolkit";
import { getDashboard } from "./dashboardApi";

export const dashboardSlice = createSlice({
    name: "dashboard",
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
        [getDashboard.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getDashboard.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getDashboard.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        }
    }
})

export default dashboardSlice.reducer