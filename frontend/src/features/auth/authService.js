import axios from "axios";

const API_URL = '/api/users' //Route vers notre API (backend) (server.js)

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "/register", userData)

    if (response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const getAllUsers = async () => {
    const response = await axios(API_URL + "/all")
    return response.data
}

const logout = async () => {
    localStorage.removeItem('user')
}

const login = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData)

    if (response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const userExist = async (userData) => {
    const response = await axios.post(API_URL + '/checkUser', userData)

    console.log(response.data)

    return response.data
}

const authService = {
    register,
    login,
    logout,
    userExist,
    getAllUsers
}

export default authService