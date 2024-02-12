import React from 'react';
import {FaGear} from "react-icons/fa6";
import {FaArrowDown, FaArrowUp, FaPen, FaTrash} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, resetProducts} from "../../features/products/productSlice";
import {useNavigate} from "react-router-dom";
import {deleteOption} from "../../features/options/optionSlice";

const OptionItem = ({ option }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)

    const formatNumberWithApostrophe = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    };

    return (
        <>
           <div className="card">
               <h2>{option.pack_amount === 1 ? ("Unité") : ("Pack de " + option.pack_amount)}</h2>
               <div className="settings">
                   {user.is_admin && <FaTrash onClick={() => dispatch(deleteOption(option._id))} className="trash icon"/>}
                   {user.is_admin && <FaPen onClick={() => navigate("/options/edit/"+option._id)} className="gear icon"/>}
                   <FaArrowDown onClick={() => {
                       dispatch(resetProducts())
                       navigate("/options/stockremove/"+option._id)
                   }} className="down icon"/>
                   <FaArrowUp onClick={() => {
                       dispatch(resetProducts())
                       navigate("/options/stockadd/"+option._id)
                   }} className="up icon"/>
               </div>

               <div className="stocks">
                   <div className="actuals">
                       <p>Stock actuel</p>
                       <p className="number">{formatNumberWithApostrophe(option.amount)}</p>
                   </div>

                   <div className="total">
                       <p>Stock initial</p>
                       <p className="number">{formatNumberWithApostrophe(option.initial_amount)}</p>
                   </div>
               </div>
           </div>
        </>
    );
};

export default OptionItem;