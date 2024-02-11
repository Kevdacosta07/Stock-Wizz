import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../auth/authService";

const API_URL = "/api/options/"

const getAllOptions = async () => {
    const response = await axios.get(API_URL + "all")
    return response.data
}

const getSpecificOption = async (optionId) => {
    const response = await axios.get(API_URL + "option/" + optionId)
    return response.data
}

const getProductOptions = async (productId) => {
    const response = await axios.get(API_URL + "product/" + productId)
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

const updateOption = async (id, optionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'edit/'+ id, optionData, config)

    return response.data
}

const updateAmountOption = async (id, optionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'editAmount/'+ id, optionData, config)

    return response.data
}

const optionService = {
    getAllOptions,
    deleteOption,
    addOption,
    getProductOptions,
    getSpecificOption,
    updateOption,
    updateAmountOption
}

export default optionService