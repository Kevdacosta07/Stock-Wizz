import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaPlus} from "react-icons/fa";
import {getAllProducts} from "../../../features/products/productSlice";
import {reset} from "../../../features/auth/authSlice";
import {toast} from "react-toastify";

const Admin = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {products, isLoading, isSuccess, isError} = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        dispatch(reset())
    }, [isLoading, isError, isSuccess])

    return (
        <>
            <div className="adminOverview">
                <div className="productsContainer">
                    <div className="title">
                        <h2>Vos stocks</h2>
                        {user && <Link className="productLink" to="/addProduct"><FaPlus/><p>Ajouter un produit</p></Link>}
                    </div>

                    <div className="card-container">
                        {products.map((product) => {
                            return <p>{product.name}</p>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;