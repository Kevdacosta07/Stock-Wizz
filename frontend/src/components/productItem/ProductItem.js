import React, {useEffect, useState} from 'react';
import {FaGear} from "react-icons/fa6";
import {FaArrowDown, FaPen, FaSignInAlt, FaTrash} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct} from "../../features/products/productSlice";
import {useNavigate} from "react-router-dom";
import {getAllOptions, getProductOptions, optionReset} from "../../features/options/optionSlice";
import Spinner from "../spinner/Spinner";

const ProductItem = ({ product, user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {options, isLoading} = useSelector((state) => state.options)

    const [totalInitialAmount, setTotalInitialAmount] = useState(0)
    const [totalActualAmount, setTotalActualAmount] = useState(0)

    useEffect(() => {
        dispatch(getAllOptions())
    }, [product._id])

    useEffect(() => {

        if (options.length !== 0)
        {
            setTotalInitialAmount(0)
            setTotalActualAmount(0)

            options.forEach((option) => {
                if (option.product_id === product._id)
                {
                    setTotalInitialAmount((prevState) => prevState + option.initial_amount * option.pack_amount)
                    setTotalActualAmount((prevState) => prevState + option.amount * option.pack_amount)
                }
            })
        }
    }, [options, product._id])

    const formatNumberWithApostrophe = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    };

    if (isLoading)
    {
        return <Spinner/>
    }


    return (
        <>
           <div className="card" >
               <h2>{product.name}</h2>
               <div className="settings">
                   {user.is_admin && <FaTrash onClick={() => navigate("/produits/confirmRemove/" + product._id)} className="trash icon"/>}
                   {user.is_admin && <FaPen onClick={() => navigate("/produits/edit/" + product._id)} className="gear icon"/>}
                   <FaSignInAlt className="icon" onClick={() => navigate("/produit/" + product._id)} />
               </div>

               <div className="stocks">
                   <div className="actuals">
                       <p>Stock actuel</p>
                       <p className="number">{formatNumberWithApostrophe(totalActualAmount)}</p>
                   </div>

                   <div className="total">
                       <p>Stock initial</p>
                       <p className="number">{formatNumberWithApostrophe(totalInitialAmount)}</p>
                   </div>
               </div>
           </div>
        </>
    );
};

export default ProductItem;