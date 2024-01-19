import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../auth/authService";

const API_URL = "/api/products/"

const getAllProducts = async () => {
    const response = await axios(API_URL + "all")
    return response.data
}

const addProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "add", productData, config)

    return response.data
}

const deleteProducts = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    console.log(productId)

    const response = await axios.delete(API_URL + "delete/" + productId, config)
    return response.data
}

const productService = {
    getAllProducts,
    deleteProducts,
    addProduct
}

export default productService