import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSpecificProduct, resetProducts} from "../../features/products/productSlice";

const TransactionItem = ( { transaction } ) => {

    const dispatch = useDispatch()
    const {product} = useSelector((state) => state.products)

    // Le produit est disponible, vous pouvez effectuer le rendu normalement
    return (
        <tr>
            <td>{transaction.product_name}</td>
            <td className="number">{transaction.amount}</td>
            <td className="type-info">{transaction.type === 'Retrait' ? (<span className="red">Retrait</span>) : (<span className="green">Ajout</span>)}</td>
        </tr>
    );
};

export default TransactionItem;