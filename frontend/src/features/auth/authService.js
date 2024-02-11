import axios from "axios";

const API_URL = '/api/users' //Route vers notre API (backend) (server.js)

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "/register", userData)

    return response.data
}

const getAllUsers = async () => {
    const response = await axios(API_URL + "/all")
    return response.data
}

const getSpecificUser = async (userId) => {
    const response = await axios(API_URL + "/user/" + userId)
    return response.data
}

const logout = async () => {
    localStorage.removeItem('user')
}

const deleteUser = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + "/delete/" + productId, config)
    return response.data
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

const updateUser = async (id, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/edit/'+id, userData, config)

    const user = JSON.parse(localStorage.getItem('user'))
    const newData = response.data

    if (newData.email === user.email)
    {
        localStorage.removeItem("user")
        localStorage.setItem('user', JSON.stringify(newData))
    }

    return response.data
}

const authService = {
    register,
    login,
    logout,
    userExist,
    getAllUsers,
    deleteUser,
    getSpecificUser,
    updateUser
}

export default authService