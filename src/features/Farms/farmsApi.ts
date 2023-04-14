import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { IFarms } from "../../models/farms";

export const getFarms = createAsyncThunk("farms/getFarms", async () => {
    try {
        const response = await api.get("farms")
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addFarms = createAsyncThunk("farms/addFarms", async (farms: IFarms) => {
    try {
        const response = await api.post("farms", farms)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateFarms = createAsyncThunk("farms/updateFarms",
    async (farms: IFarms) => {
        try {
            const response = await api.patch(`farms/${farms.id}`, farms);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

export const deleteFarms = createAsyncThunk("farms/deleteFarms", async (id: number) => {
    try {
        const response = await api.delete(`farms/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})