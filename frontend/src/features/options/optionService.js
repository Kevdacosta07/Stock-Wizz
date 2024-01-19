import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../auth/authService";

const API_URL = "/api/options/"

const getAllOptions = async () => {
    const response = await axios.get(API_URL + "all")
    return response.data
}

const getProductOption = async (productId) => {
    const response = await axios.get(API_URL + "productOption/" + productId)
    return response.data
}

const addOption = async (optionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "add", optionData, config)

    return response.data
}

const deleteOption = async (optionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + "delete/" + optionId, config)
    return response.data
}

const optionService = {
    getAllOptions,
    deleteOption,
    addOption
}

export default optionService