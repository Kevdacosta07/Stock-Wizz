import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../auth/authService";

const API_URL = "/api/products/"

const getAllProducts = async () => {
    const response = await axios(API_URL + "all")
    return response.data
}

const getSpecificProduct = async (productId) => {
    const response = await axios.get(API_URL + "product/" + productId)
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

    const response = await axios.delete(API_URL + "delete/" + productId, config)
    return response.data
}

const updateProduct = async (id, productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'edit/'+id, productData, config)

    return response.data
}

const productService = {
    getAllProducts,
    deleteProducts,
    addProduct,
    getSpecificProduct,
    updateProduct
}

export default productService