import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getDashboard = createAsyncThunk("dashboard/getDashboard", async () => {
    try {
        const response = await api.get("dashboard")
        return response.data
    } catch (error) {
        console.log(error)
    }
})