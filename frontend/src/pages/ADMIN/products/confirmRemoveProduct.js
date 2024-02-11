import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getSpecificProduct, resetProducts} from "../../../features/products/productSlice";
import Spinner from "../../../components/spinner/Spinner";
import {toast} from "react-toastify";

const ConfirmRemoveProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();
    const {product, isLoading, message, isDeletedProduct, isError} = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getSpecificProduct(id))
    }, [id])



    useEffect(() => {
        if (isError)
        {
            toast.error(message)
        }

        if (isDeletedProduct)
        {
            toast.success("Votre produit a été supprimé avec succès !")
            dispatch(resetProducts())
            navigate("/produits")
        }
    }, [isError, message, isDeletedProduct])

    if (isLoading)
    {
        return <Spinner />
    }

    return (
        <>
           <div className="confirmRemoveProduct">
               <div className="text">
                   <p>Vous êtes sur le point de supprimer le produit <span className="bold">{product.name}</span></p>
                   <button onClick={() => dispatch(deleteProduct(id))}>Confirmer</button>
               </div>
           </div>
        </>
    );
};

export default ConfirmRemoveProduct;