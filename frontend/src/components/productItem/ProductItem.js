import React from 'react';
import {FaGear} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {deleteProduct} from "../../features/products/productSlice";
import {useNavigate} from "react-router-dom";

const ProductItem = ({ product }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
           <div className="card">
               <h2>{product.name}</h2>
               <FaGear onClick={() => navigate("/produit/" + product._id)} className="gear"/>
               <FaTrash onClick={() => dispatch(deleteProduct(product._id))} className="trash"/>

               <div className="stocks">
                   <div className="actuals">
                       <p>Stock actuel</p>
                       <p className="number">0</p>
                   </div>
                   <div className="total">
                       <p>Stock initial</p>
                       <p className="number">0</p>
                   </div>
               </div>
           </div>
        </>
    );
};

export default ProductItem;