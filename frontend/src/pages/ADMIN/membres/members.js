import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {getAllUsers, reset} from "../../../features/auth/authSlice";
import {toast} from "react-toastify";
import {FaPlus} from "react-icons/fa";
import Spinner from "../../../components/spinner/Spinner";
import UserItem from "../../../components/userItem/UserItem";

const Members = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, users, isLoading, message, isError, isDeletedUser} = useSelector((state) => state.auth)

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter((user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const myuser = user

    useEffect(() => {
        dispatch(getAllUsers())
    }, [isDeletedUser])

    useEffect(() => {
        if (isError)
        {
            toast.error(message)
        }

        if (isDeletedUser)
        {
            toast.success("L'utilisateur a été supprimé avec succès !")
        }

        dispatch(reset())
    }, [isError, message, isDeletedUser])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="membres">
                <div className="title">
                    <h1>Vos membres</h1>
                    <p>Gérez vos membres en toute simplicité</p>
                </div>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Rechercher un membre"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <FaMagnifyingGlass className="glass-icon" />
                </div>

                <div className="membersContainer">
                    {filteredUsers.map((user, index) => (
                        <UserItem user={user} key={index} myuseradmin={myuser.is_admin} />
                    ))}
                </div>

                <div className="addmember">
                    {user.is_admin && <Link to="/membres/add" className="link"><FaPlus className="icon"/>Ajouter un membre</Link>}
                </div>
            </div>
        </>
    );
};

export default Members;