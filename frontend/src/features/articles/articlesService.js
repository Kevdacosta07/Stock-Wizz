import axios from "axios";

const API_URL = "/api/articles/"

const getAllArticles = async () => {
    const response = await axios(API_URL + "all")
    return response.data
}

const getUserArticles = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios(API_URL + "user", config)
    return response.data
}

const deleteArticles = async (articleId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + "delete/" + articleId, config)
    return response.data
}

const articlesService = {
    getAllArticles,
    getUserArticles,
    deleteArticles
}

export default articlesService