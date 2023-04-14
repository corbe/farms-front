import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { IAreas } from "../../models/areas";

export const getAreas = createAsyncThunk("areas/getAreas", async () => {
    try {
        const response = await api.get("areas")
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addAreas = createAsyncThunk("areas/addAreas", async (areas: IAreas) => {
    try {
        const response = await api.post("areas", areas)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateAreas = createAsyncThunk("areas/updateAreas",
    async (areas: IAreas) => {
        try {
            const response = await api.patch(`areas/${areas.id}`, areas);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

export const deleteAreas = createAsyncThunk("areas/deleteAreas", async (id: number) => {
    try {
        const response = await api.delete(`areas/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})