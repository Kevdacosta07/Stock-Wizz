import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getAllOptions, getProductOptions} from "../../../features/options/optionSlice";
import {toast} from "react-toastify";
import {getSpecificProduct, resetProducts} from "../../../features/products/productSlice";
import {optionReset} from "../../../features/options/optionSlice";
import OptionItem from "../../../components/optionItem/OptionItem";
import {FaPlus} from "react-icons/fa";

const SpecificProduct = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {options, message, isSuccess, isError} = useSelector((state) => state.options)
    const {product} = useSelector((state) => state.products)

    const {id} = useParams();

    useEffect(() => {
        dispatch(getSpecificProduct(id))
        dispatch(getProductOptions(id))
    }, [id]);

    useEffect(() => {
        if (isError)
        {
            toast.error(message)
        }

        dispatch(resetProducts())
        dispatch(optionReset())
    }, [isError, message])


    return (
        <>
            <div className="specificProduct">
                <div className="title">
                    <h2>{product.name}</h2>
                    <p>Gérez l’ensemble de vos produits simplement</p>
                </div>

                <div className="descriptionContainer">
                    <div className="left">
                        <h3>Informations supplémentaires</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="right">

                    </div>
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

                <div className="addOption" onClick={() => {
                    navigate("/options/add/"+id)
                    dispatch(optionReset())
                }}>
                    <FaPlus/>
                    <p>Ajouter une option</p>
                </div>
            </div>
        </>
    );
};

export default SpecificProduct;