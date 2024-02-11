import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getAllUsers, reset} from "../../../features/auth/authSlice";
import Spinner from "../../../components/spinner/Spinner";
import {FaEnvelope} from "react-icons/fa";
import Header from "../../../components/header/header";
import {userExist} from "../../../features/auth/authSlice";
import {getAllProducts} from "../../../features/products/productSlice";


const Home = () => {

    const [formData, setFormData] = useState({
        email: ''
    })

    const { email } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isLoading, checkUser, isError, message, users, user} = useSelector((state) => state.auth)
    const {products} = useSelector((state) => state.products)

    useEffect(() => {

        if (user)
        {
            navigate('/admin')
        }

        if (checkUser)
        {
            dispatch(reset())
            navigate('/login')
        }

        if (isError) {
            toast.error(message)
        }

        dispatch(reset())
    }, [isError, checkUser, message, navigate]);

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllProducts)
    }, [])

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
            email
        }

        dispatch(userExist(userData))
    }

    if (isLoading)
    {
        return <Spinner/>
    }


    return (
        <>
            <section className="home">
                <Header/>
                <div className="HomeText">
                    <div className="text">
                        <h1>Stockez Dès Maintenant</h1>
                        <p>Lorem ipsum dolor sit amet consectetur. At fusce turpis ante eu at diam. Lorem potenti eu at et turpis bibendum sed semper sit. Tellus pellentesque elit egestas porta. Lacus nec suspendisse eget maecenas pellentesque tempus. Augue tincidunt diam.</p>
                    </div>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="input-box">
                        <FaEnvelope className="icon"/>
                        <input type="email" name="email" id="email" value={email} onChange={onChange} placeholder="Votre adresse mail"/>
                        <button>Commencer</button>
                    </div>
                </form>

                <div className="card-container">
                    <div className="card">
                        <div className="text">
                            {users ? (
                                <h2 className="title">{users.length}</h2>
                            ) : (<h2>0</h2>)}
                            <p className="text">Membres</p>
                        </div>

                        <div className="divider"></div>

                        <div className="text">
                            <h2 className="title">1'400</h2>
                            <p className="text">Stock</p>
                        </div>

                        <div className="divider"></div>

                        <div className="text">
                            <h2 className="title">{products.length}</h2>
                            <p className="text">Produits</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;