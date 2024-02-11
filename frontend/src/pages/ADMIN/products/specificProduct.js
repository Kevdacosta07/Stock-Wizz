import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getProductOptions} from "../../../features/options/optionSlice";
import {toast} from "react-toastify";
import {getSpecificProduct, resetProducts} from "../../../features/products/productSlice";
import {optionReset} from "../../../features/options/optionSlice";
import OptionItem from "../../../components/optionItem/OptionItem";
import {FaPlus} from "react-icons/fa";
import Spinner from "../../../components/spinner/Spinner";

const SpecificProduct = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {options, message, isDeletedOption, isError, isLoading} = useSelector((state) => state.options)
    const {user} = useSelector((state) => state.auth)
    const {product} = useSelector((state) => state.products)

    const {id} = useParams();

    useEffect(() => {
        dispatch(getSpecificProduct(id))
        dispatch(getProductOptions(id))
    }, [id]);

    useEffect(() => {
        dispatch(getProductOptions(id))
        dispatch(getSpecificProduct(id))
    }, [isDeletedOption])

    useEffect(() => {
        if (isError)
        {
            toast.error(message)
        }

        if (isDeletedOption)
        {
            toast.success("Votre option a été supprimée avec succès !")
        }

        dispatch(resetProducts())
        dispatch(optionReset())
    }, [isError, message, isDeletedOption])

    let totalActualAmount = 0

    if (options.length !== 0)
    {
        options.forEach((option) => {
            totalActualAmount += option.amount * option.pack_amount
        })
    }

    // Fonction utilitaire pour formater le nombre avec une apostrophe simple comme séparateur des milliers
    const formatNumberWithApostrophe = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    };

    const imagepath = "/uploads/"

    if (isLoading)
    {
        return <Spinner />
    }


    return (
        <>
            <div className="specificProduct">
                <div className="title">
                    <h2>{product.name}</h2>
                    <p>Gérez l’ensemble de vos produits simplement</p>
                </div>

                <div className="descriptionContainer">
                    <div style={{ width: product.productImage ? "70%" : "100%" }} className="left">
                        <h3>Informations supplémentaires</h3>
                        <p>{product.description}</p>

                        <div className="actualStock">
                            <p>Stock total actuel (unité)</p>
                            <p className="number">{formatNumberWithApostrophe(totalActualAmount)}</p>
                        </div>
                    </div>

                    {product.productImage && <div className="right">
                        <img src={imagepath+product.productImage} alt=""/>
                    </div>}
                </div>

                <div className="optionsContainer">
                    {options.length > 0 ? (
                        options.map((option, index) => (
                            <OptionItem key={index} option={option} />
                        ))
                    ) : (
                        <p>Aucune option</p>
                    )}
                </div>

                {user.is_admin && <div className="addOption" onClick={() => {
                    navigate("/options/add/"+id)
                    dispatch(optionReset())}}>
                    <FaPlus/>
                    <p>Ajouter une option</p>
                </div>}
            </div>
        </>
    );
};

export default SpecificProduct;