import React from 'react';
import {FaGear} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {deleteProduct} from "../../features/products/productSlice";
import {useNavigate} from "react-router-dom";
import {deleteOption} from "../../features/options/optionSlice";

const OptionItem = ({ option }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(option)

    return (
        <>
           <div className="card">
               <h2>{option.pack_amount === 1 ? ("Unité") : ("Pack de " + option.pack_amount)}</h2>
               <FaGear onClick={() => navigate("/produit/"+option._id)} className="gear"/>
               <FaTrash onClick={() => dispatch(deleteOption(option._id))} className="trash"/>

               <div className="stocks">
                   <div className="actuals">
                       <p>Stock actuel</p>
                       <p className="number">{option.amount}</p>
                   </div>
                   <div className="total">
                       <p>Stock initial</p>
                       <p className="number">{option.initial_amount}</p>
                   </div>
               </div>
           </div>
        </>
    );
};

export default OptionItem;