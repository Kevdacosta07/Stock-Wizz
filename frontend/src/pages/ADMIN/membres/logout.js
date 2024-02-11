import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../../../features/auth/authSlice";
import {toast} from "react-toastify";

const Logout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isCreatedUser, isLoading, message} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(logout())
        navigate("/")
        toast.info("Vous avez été déconnecté!")
        dispatch(reset())
    }, [])

    return (
        <>

        </>
    );
};

export default Logout;