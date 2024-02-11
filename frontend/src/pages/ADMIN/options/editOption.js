import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {addOption, getSpecificOption, optionReset, updateOption} from "../../../features/options/optionSlice";
import {toast} from "react-toastify";
import {getSpecificProduct} from "../../../features/products/productSlice";

const EditOption = () => {
    const [formData, setFormData] = useState({
        pack_amount: "",
        amount: "",
    })

    const { pack_amount, amount } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {option, isError, isEditedOption, isLoading, message} = useSelector((state) => state.options)
    const {product} = useSelector((state) => state.products)

    const { id } = useParams();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    useEffect(() => {
        if (id)
        {
            dispatch(getSpecificOption(id))
        }
    }, [id])

    useEffect(() => {
        if (id)
        {
            dispatch(getSpecificProduct(option.product_id))
        }
    }, [id])


    useEffect(() => {
        // Vérifier si option est défini avant d'accéder à ses propriétés
        if (option) {
            setFormData({
                amount: option.amount ?? '',
                pack_amount: option.pack_amount ?? ''
            });
        }
    }, [option])

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (isEditedOption)
        {
            if (!isLoading)
            {
                navigate("/produit/" + product._id)
                toast.success("Votre option a été modifiée !")
            }
        }

        dispatch(optionReset())

    }, [isError, isEditedOption, isLoading, dispatch, navigate, message]);

    const onSubmit = (e) =>
    {
        // On empêche la page de se recharger
        e.preventDefault()

        let p_amount = parseInt(pack_amount)
        let amountfinal = parseInt(amount)


        const optionData = {
            product_id: product._id,
            pack_amount : p_amount,
            amount: amountfinal,
            initial_amount: amountfinal,
        }

        dispatch(updateOption({id: id, option: optionData}))
    }


    return (
        <>
            <div className="addproduct">
                <div className="title">
                    <h2>Modifier une option</h2>
                </div>
                <form action="" onSubmit={onSubmit}>
                    <div className="input-box">
                        <label htmlFor="name">Unité par pack</label>
                        <input type="number" name="pack_amount" id="pack_amount" onChange={onChange} value={pack_amount}/>
                    </div>

                    <div className="input-box">
                        <label htmlFor="amount">Nombre de packs en votre possession</label>
                        <input type="number" id="amount" name="amount" onChange={onChange} value={amount}/>
                    </div>

                    <button type="submit">Modifier l'option</button>
                </form>
            </div>
        </>
    );
};

export default EditOption;