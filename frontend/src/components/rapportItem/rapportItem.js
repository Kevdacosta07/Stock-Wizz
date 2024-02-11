import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificProduct } from '../../features/products/productSlice';

const RapportItem = ({ transaction, totalAmount }) => {
    const dispatch = useDispatch();
    const [finalProduct, setFinalProduct] = useState({});
    const [filledPourcent, setFilledPourcent] = useState(0);
    const pathImage = "/uploads/";

    const formatNumberWithApostrophe = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (transaction[1].product_id) {
                const response = await dispatch(getSpecificProduct(transaction[1].product_id));

                if (getSpecificProduct.fulfilled.match(response)) {
                    setFinalProduct(response.payload);

                    setFilledPourcent((transaction[1].amount * 100) / totalAmount)
                }
            }
        };

        fetchProductDetails();

    }, [dispatch, transaction]);

    return (
        <div className="rapport">
            <div className="image">
                <img src={pathImage + finalProduct.productImage} alt="" />
            </div>
            <div className="blockinfo">
                <div className="filler" style={{ width: `${filledPourcent}%` }}></div>
                <p>
                    <span className="capitalize">{transaction[0]}</span> : <span className="numbers">{formatNumberWithApostrophe(transaction[1].amount)}</span> ventes (<span className="numbers">{filledPourcent.toFixed(0)}</span>%)
                </p>
            </div>
        </div>
    );
};

export default RapportItem;