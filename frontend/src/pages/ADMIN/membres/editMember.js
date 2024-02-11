import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getSpecificUser, register, reset, updateUser} from "../../../features/auth/authSlice";
import Spinner from "../../../components/spinner/Spinner";

const AddMembers = () => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        poste: '',
        email: '',
        password: '',
        is_admin: false
    })

    const { first_name, last_name,  poste, email, password, is_admin} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, specificUser, isError, isUpdatedUser, isLoading, message} = useSelector((state) => state.auth)
    const { id } = useParams()

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onCheckboxChange = () => {
        setFormData((prevData) => ({
            ...prevData,
            is_admin: !prevData.is_admin,
        }));
    };

    useEffect(() => {
        dispatch(getSpecificUser(id))
    }, [id])

    useEffect(() => {
        // Vérifier si specificUser est défini avant d'accéder à ses propriétés
        if (specificUser && specificUser.user) {
            setFormData({
                first_name: specificUser.user.first_name ?? '',
                last_name: specificUser.user.last_name ?? '',
                poste: specificUser.user.poste ?? '',
                email: specificUser.user.email ?? '',
                password: '',
                is_admin: specificUser.user.is_admin ?? false,
            });
        }
    }, [specificUser]);

    useEffect(() => {

        if (isError)
        {
            toast.error(message)
            return
        }

        if (isUpdatedUser)
        {
            if (!isLoading)
            {
                navigate("/membres")
                toast.success("Un membre a été édité !")
            }
        }
    }, [isError, isUpdatedUser, isLoading, dispatch, message]);

    const onSubmit = (e) =>
    {
        // On empêche la page de se recharger
        e.preventDefault()

        const userData = {
            first_name: first_name,
            last_name: last_name,
            poste: poste,
            email: email,
            password: password,
            is_admin: is_admin
        }

        dispatch(updateUser({ id: id, user: userData }))
    }

    if (isLoading)
    {
        return <Spinner />
    }

    return (
        <>
            <div className="addmembers">
                <div className="text">
                    <h2>Éditer un membre</h2>
                    <p>Éditez les informations personnelles !</p>
                </div>

                <form action="" onSubmit={onSubmit}>
                    <div className="input-box">
                        <label htmlFor="last_name">Nom</label>
                        <input type="text" name="last_name" id="last_name" onChange={onChange} value={last_name}/>
                    </div>

                    <div className="input-box">
                        <label htmlFor="first_name">Prénom</label>
                        <input type="text" name="first_name" id="first_name" onChange={onChange} value={first_name}/>
                    </div>

                    <div className="input-box">
                        <label htmlFor="poste">Nom du poste</label>
                        <input type="text" name="poste" id="poste" onChange={onChange} value={poste}/>
                    </div>

                    <div className="input-box">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" onChange={onChange} value={email}/>
                    </div>

                    <div className="input-box">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" onChange={onChange} value={password}/>
                    </div>

                    <div className="input-checkbox">
                        <label htmlFor="is_admin">Administrateur</label>
                        <input
                            type="checkbox"
                            name="is_admin"
                            id="is_admin"
                            checked={is_admin}
                            onChange={onCheckboxChange}
                        />
                    </div>

                    <button type="submit">Éditer les informations</button>
                </form>
            </div>
        </>
    );
};

export default AddMembers;