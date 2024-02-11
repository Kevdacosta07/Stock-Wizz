import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../auth/authService";

const API_URL = "/api/transactions/"

const getAllTransactions = async () => {
    const response = await axios.get(API_URL + "all")
    return response.data
}

const addTransaction = async (transactionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "add", transactionData, config)

    return response.data
}

const transactionService = {
    addTransaction,
    getAllTransactions
}

export default transactionService