import axios from "axios";

const API_URL = "/api/products/"

const getAllProducts = async () => {
    const response = await axios(API_URL + "all")
    return response.data
}

const deleteProducts = async (articleId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + "delete/" + articleId, config)
    return response.data
}

const productService = {
    getAllProducts,
    deleteProducts
}

export default productService