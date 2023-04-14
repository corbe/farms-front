import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import api from "../../api";
import { IProducers } from "../../models/producers";

const handleError = (error: any) => {
    const err = error as AxiosError
    let res = err.response as AxiosResponse;        
    throw({ message: res.data.message.join('\r\n')})
}

export const getProducers = createAsyncThunk("producers/getProducers", async () => {
    try {
        const response = await api.get("producers")
        return response.data
    } catch (error) {
        handleError(error)
    }
})

export const addProducers = createAsyncThunk("producers/addProducers", async (producers: IProducers) => {
    try {
        const response = await api.post("producers", producers)
        return response.data
    } catch (error) {     
        handleError(error)
    }
})

export const updateProducers = createAsyncThunk("producers/updateProducers",
    async (producers: IProducers) => {
        try {
            const response = await api.patch(`producers/${producers.id}`, producers);
            return response.data
        } catch (error) {
            handleError(error)
        }
    }) 

export const deleteProducers = createAsyncThunk("producers/deleteProducers", async (id: number) => {
    try {
        const response = await api.delete(`producers/${id}`)
        return response.data
    } catch (error) {
        handleError(error)
    }
})