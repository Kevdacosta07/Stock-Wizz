import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getSpecificOption, optionReset, updateAmountOption, updateOption} from "../../../features/options/optionSlice";
import Spinner from "../../../components/spinner/Spinner";
import {toast} from "react-toastify";
import {register} from "../../../features/auth/authSlice";
import {getSpecificProduct, resetProducts} from "../../../features/products/productSlice";
import {addTransaction, resetTransactions} from "../../../features/transactions/transactionSlice";

const AddStock = () => {

    const [formData, setFormData] = useState({
        amount: 0
    })

    const { amount } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {option, isError, isLoading, message, isAmountEditedOption} = useSelector((state) => state.options)
    const {isTransactionError, isTransactionLoading, isCreatedTransaction, transactionMessage} = useSelector((state) => state.transactions)
    const {product} = useSelector((state) => state.products)

    const { id } = useParams()

    useEffect(() => {
        if (id)
        {
            dispatch(getSpecificOption(id))
        }
    }, [id])

    useEffect(() => {
        if (option.product_id) {
            dispatch(getSpecificProduct(option.product_id));
        }
    }, [option.product_id]);

    useEffect(() => {
        if (isError)
        {
            toast.error(message)
        }

        if (isTransactionError)
        {
            toast.error(transactionMessage)
        }

        if (isCreatedTransaction)
        {
            toast.success("Vous avez ajouté " + amount + " au stock")
            navigate("/produit/" + option.product_id)
        }

        dispatch(optionReset())
        dispatch(resetTransactions())
    }, [isError, message, dispatch, isCreatedTransaction, transactionMessage, isTransactionError])


    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) =>
    {
        // On empêche la page de se recharger
        e.preventDefault()

        let am = parseInt(amount)

        if (am < 0)
        {
            toast.error("Veuillez saisir une valeur positive.")
            return
        }

        const optionData = {
            amount: option.amount + am,
            initial_amount: option.initial_amount + am,
        }

        const transactionData = {
            product_id: product._id,
            product_name: product.name,
            amount: am * option.pack_amount,
            type: "Ajout"
        }

        dispatch(updateAmountOption({ id: id, option: optionData }))
        dispatch(addTransaction(transactionData))
    }

    if (isLoading || isTransactionLoading)
    {
        return <Spinner />
    }


    return (
        <div className="addStock">
            <div className="text">
                <h2>Retirer du stock</h2>
                <p>Vous êtes sur le point d'ajouter du stock à <span>{product.name}</span></p>
            </div>
            <form action="" onSubmit={onSubmit}>
                <div className="input-box">
                    <label htmlFor="amount">Montant</label>
                    <input type="number" name="amount" id="amount" onChange={onChange} value={amount}/>
                </div>

                <button type="submit" className="add">Ajouter du stock</button>
            </form>
        </div>
    );
};

export default AddStock;