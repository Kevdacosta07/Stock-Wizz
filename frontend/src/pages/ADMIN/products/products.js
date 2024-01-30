import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../../components/spinner/Spinner";
import {getAllProducts, resetProducts} from "../../../features/products/productSlice";
import ProductItem from "../../../components/productItem/ProductItem";
import {FaPlus} from "react-icons/fa";
import {toast} from "react-toastify";

const Products = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {products, isLoading, message, isSuccess, isError, isDeletedProduct} = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [isDeletedProduct])

    useEffect(() => {

        if (isDeletedProduct)
        {
            toast.success("Votre produit a été supprimé avec succès !")
        }

        if (isError)
        {
            toast.error(message)
        }

        dispatch(resetProducts())
    }, [isLoading, isSuccess, isError, message, isDeletedProduct]);

    return (
        <>
            <div className="produits">
                <div className="title">
                    <h1>Vos produits</h1>
                    <p>Gérez l'ensemble de vos produits simplement</p>
                </div>

                <div className="productsContainer">
                    <div className="cards-container">
                        {products.length > 0 ? (products.map((product, index) => (
                            <ProductItem key={index} product={product}/>
                        ))) : (<p>Aucun produit...</p>)}
                    </div>
                </div>

                <div className="addproduct">
                    <Link to="/produits/add" className="link"><FaPlus className="icon"/>Ajouter un produit</Link>
                </div>
            </div>
        </>
    );
};

export default Products;