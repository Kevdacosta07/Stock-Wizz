import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaPlus} from "react-icons/fa";
import {getAllProducts, resetProducts} from "../../../features/products/productSlice";
import {reset} from "../../../features/auth/authSlice";
import {toast} from "react-toastify";
import ProductItem from "../../../components/productItem/ProductItem";

const Admin = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {products, isLoading, isSuccess, message, isError, isDeletedProduct} = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [isDeletedProduct])

    useEffect(() => {

        if (isError)
        {
            toast.error(message)
        }

        if (isDeletedProduct)
        {
            toast.success("Votre produit a été supprimé avec succès!")
        }

        dispatch(reset())
        dispatch(resetProducts())
    }, [isLoading, isError, isSuccess, message, isDeletedProduct])

    return (
        <>
            <div className="adminOverview">
                <div className="productsContainer">
                    <div className="title">
                        <h2>Vos stocks</h2>
                        {user && <Link className="productLink" to="/produits/add"><FaPlus/><p>Ajouter un produit</p></Link>}
                    </div>
                    <div className="card-container">
                        {products.length > 0 ? (products.map((product, index) => {
                            return <ProductItem key={index} product={product} />
                        })) : (<p className="noProduct">Aucun produit..</p>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;