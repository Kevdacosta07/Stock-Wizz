import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {register, reset} from "../../../features/auth/authSlice";
import Spinner from "../../../components/spinner/Spinner";

const AddMembers = () => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        poste: '',
        email: '',
        password: '',
        is_admin: false,
        profileImage: null,
    })

    const { first_name, last_name,  poste, email, password, is_admin, profileImage} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isCreatedUser, isLoading, message} = useSelector((state) => state.auth)

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

    const onImageChange = (e) => {
        const imageFile = e.target.files[0];

        setFormData({
            ...formData,
            profileImage: imageFile,
        });
    };

    useEffect(() => {

        if (isError)
        {
            toast.error(message)
            return
        }

        if (isCreatedUser)
        {
            if (!isLoading)
            {
                navigate("/membres")
                toast.success("Un membre a été créé !")
            }
        }
    }, [isError, isCreatedUser, isLoading, dispatch, message]);

    const onSubmit = (e) => {
        e.preventDefault();

        // Créer un objet FormData pour inclure le fichier image
        const formDataWithImage = new FormData();
        formDataWithImage.append('first_name', first_name);
        formDataWithImage.append('last_name', last_name);
        formDataWithImage.append('poste', poste);
        formDataWithImage.append('email', email);
        formDataWithImage.append('password', password);
        formDataWithImage.append('is_admin', is_admin);
        formDataWithImage.append('profileImage', profileImage); // Ajouter le fichier image

        dispatch(register(formDataWithImage));
    };

    if (isLoading)
    {
        return <Spinner />
    }

    return (
        <>
            <div className="addmembers">
                <div className="text">
                    <h2>Créer un membre</h2>
                    <p>Ajouter un membre à votre équipe !</p>
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

                    <input
                        type="file"
                        name="profileImage"
                        id="profileImage"
                        accept="image/*"
                        onChange={onImageChange}
                    />

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

                    <button type="submit">Créer un membre</button>
                </form>
            </div>
        </>
    );
};

export default AddMembers;