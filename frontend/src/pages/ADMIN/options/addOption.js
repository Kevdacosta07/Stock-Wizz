import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {addOption, optionReset} from "../../../features/options/optionSlice";

const AddOption = () => {

    const [formData, setFormData] = useState({
        pack_amount: "",
        amount: "",
    })

    const { pack_amount, amount } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError, isSuccess, isLoading, message} = useSelector((state) => state.options)

    const {id} = useParams();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    useEffect(() => {
        dispatch(optionReset())
    }, [])

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (isSuccess)
        {
            if (!isLoading)
            {
                navigate("/produit/" + id)
                toast.success("Votre option a été ajoutée !")
            }
        }

        dispatch(optionReset())

    }, [isError, isSuccess, isLoading, dispatch, navigate, message]);

    const onSubmit = (e) =>
    {
        // On empêche la page de se recharger
        e.preventDefault()

        let p_amount = parseInt(pack_amount)
        let amountfinal = parseInt(amount)


        const optionData = {
            product_id: id,
            pack_amount : p_amount,
            amount: amountfinal,
            initial_amount: amountfinal,
        }

        dispatch(addOption(optionData))
    }


    return (
        <>
            <div className="addproduct">
                <div className="title">
                    <h2>Ajouter une option</h2>
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

                    <button type="submit">Ajouter l'option</button>
                </form>
            </div>
        </>
    );
};

export default AddOption;