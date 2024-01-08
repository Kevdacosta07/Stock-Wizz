import React, {useEffect, useState} from 'react';
import {FaSign, FaSignInAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {login, reset, resetCheckUser} from "../../../features/auth/authSlice";
import Spinner from "../../../components/spinner/Spinner";
import Logo from "../../../assets/Logo.png"
import Header from "../../../components/header/header";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isLoading, isError, message} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(resetCheckUser())
    }, []);

    useEffect(() => {

        if (user) {
            navigate('/admin')
        }

        if (isError) {
            toast.error(message)
        }

        dispatch(reset())
    }, [user, isError, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) =>
    {
        // On empêche la page de se recharger
        e.preventDefault()

        const userData = {
            email, password
        }

        dispatch(login(userData))
    }

    if (isLoading)
    {
        return <Spinner />
    }

    return (
        <>
            <div className="login">
                <div className="left">

                    <div className="logo">
                        <img src={Logo} alt=""/>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <input
                                type="email"
                                className='form-control'
                                id='email'
                                name='email'
                                value={email}
                                placeholder='Votre adresse e-mail'
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input
                                type="password"
                                className='form-control'
                                id='password'
                                name='password'
                                value={password}
                                placeholder='Votre mot de passe'
                                onChange={onChange}
                            />
                        </div>

                        <button className='btn btn-block' type='submit'>
                            <p>Connexion</p>
                            <div><FaSignInAlt className="signin"/></div>
                        </button>
                    </form>
                </div>

                <div className="right"></div>
            </div>

        </>
    );
};

export default Login;