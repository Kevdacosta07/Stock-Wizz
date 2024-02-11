import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaPlus} from "react-icons/fa";
import {getAllProducts, resetProducts} from "../../../features/products/productSlice";
import {getAllUsers, reset} from "../../../features/auth/authSlice";
import {toast} from "react-toastify";
import ProductItem from "../../../components/productItem/ProductItem";
import Spinner from "../../../components/spinner/Spinner";
import TransactionItem from "../../../components/transactionItem/transactionItem";
import {getAllTransactions} from "../../../features/transactions/transactionSlice";
import UserItem from "../../../components/userItem/UserItem";

const Admin = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, users, isDeletedUser} = useSelector((state) => state.auth)
    const {products, isLoading, isSuccess, message, isError, isDeletedProduct} = useSelector((state) => state.products)
    const {transactions, isTransactionLoading, transactionMessage, isTransactionError} = useSelector((state) => state.transactions)


    useEffect(() => {
        dispatch(getAllProducts())
    }, [isDeletedProduct])

    useEffect(() => {
        dispatch(getAllUsers())
    }, [isDeletedUser])

    useEffect(() => {
        dispatch(getAllTransactions())
    }, [])

    const filteredAndSortedTransactions = [...transactions]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    useEffect(() => {

        if (isError)
        {
            toast.error(message)
        }

        if (isTransactionError)
        {
            toast.error(transactionMessage)
        }

        if (isDeletedProduct)
        {
            toast.success("Votre produit a été supprimé avec succès!")
        }

        dispatch(reset())
        dispatch(resetProducts())
    }, [isLoading, isError, isSuccess, message, isDeletedProduct, isTransactionError, transactionMessage])

    if (isLoading || isTransactionLoading)
    {
        return <Spinner />
    }

    return (
        <>
            <div className="adminOverview">
                <div className="productsContainer">
                    <div className="title">
                        <h2>Vos stocks</h2>
                        {user && <Link className="productLink" to="/produits/add"><FaPlus/><p>Ajouter un produit</p></Link>}
                    </div>
                    <div className="card-container">
                        {products.length > 0 ? (products.map((product, index) => {
                            return <ProductItem key={index} product={product} user={user} />
                        })) : (<p className="noProduct">Aucun produit..</p>)}
                    </div>
                </div>

                <div className="transactionContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Quantité</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredAndSortedTransactions.length > 0 ? (filteredAndSortedTransactions.map((transaction, index) => {
                            return <TransactionItem key={index} transaction={transaction} />
                        })) : (<p className="noProduct">Aucune transaction..</p>)}
                        </tbody>
                    </table>
                </div>

                <div className="membersContainer">
                    <div className="title">
                        <h2>Membres</h2>
                        {user && <Link className="productLink" to="/membres/add"><FaPlus/><p>Ajouter un membre</p></Link>}
                    </div>
                    <div className="card-container">
                        {users.length > 0 ? (users.map((us, index) => {
                            return <UserItem key={index} user={us} myuseradmin={user.is_admin} />
                        })) : (<p className="noProduct">Aucun utilisateur..</p>)}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Admin;