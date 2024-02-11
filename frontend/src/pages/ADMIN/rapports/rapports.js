import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../../features/transactions/transactionSlice';
import OptionItem from "../../../components/optionItem/OptionItem";
import RapportItem from "../../../components/rapportItem/rapportItem";
import {getSpecificProduct} from "../../../features/products/productSlice";
import Spinner from "../../../components/spinner/Spinner";

const Rapports = () => {
    const dispatch = useDispatch();
    const { transactions, isTransactionLoading } = useSelector((state) => state.transactions);
    const { product } = useSelector((state) => state.products);

    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionsObject, setTransactionsObject] = useState({});
    const [top5Transactions, setTop5Transactions] = useState([]);

    const formatNumberWithApostrophe = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    };

    useEffect(() => {
        dispatch(getAllTransactions());
    }, [dispatch]);

    useEffect(() => {
        if (transactions.length > 0) {
            const newTransactionsObject = {};
            let totalAmount = 0;

            transactions.forEach((transaction) => {
                if (transaction.type === "Retrait") {
                    totalAmount += transaction.amount;

                    if (!newTransactionsObject.hasOwnProperty(transaction.product_name)) {
                        newTransactionsObject[transaction.product_name] = {amount: transaction.amount, product_id: transaction.product_id};
                    } else {
                        newTransactionsObject[transaction.product_name].amount += transaction.amount;
                    }
                }
            });

            // Mettre à jour l'état avec les résultats calculés
            setTransactionAmount(totalAmount);
            setTransactionsObject(newTransactionsObject);
        }
    }, [transactions]);

    useEffect(() => {
        // Convertir transactionsObject en tableau d'entrées
        const transactionsArray = Object.entries(transactionsObject);

        // Trier le tableau en fonction des montants de manière décroissante
        transactionsArray.sort((a, b) => b[1].amount - a[1].amount);

        // Extraire les 5 premiers éléments
        const top5 = transactionsArray.slice(0, 5);

        // Mettre à jour l'état avec les 5 premiers éléments
        setTop5Transactions(top5);
    }, [transactionsObject])

    if (isTransactionLoading)
    {
        return <Spinner />
    }

    return (
        <>
            <div className="rapports">
                <div className="text">
                    <h2>Rapports</h2>
                    <p>Ventes totales : <span>{formatNumberWithApostrophe(transactionAmount)}</span></p>
                </div>

                <div className="rapports-container">
                    {top5Transactions.length > 0 ? (
                        top5Transactions.map((transaction, index) => (
                            <RapportItem key={index} transaction={transaction} totalAmount={transactionAmount} />
                        ))
                    ) : (
                        <p>Aucun rapport ne peut être effectué !</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Rapports;