import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, resetProducts} from "../../../features/products/productSlice";
import {toast} from "react-toastify";

const Addproduct = () => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        initial_amount: 0,
        productImage: null
    })

    const { name, description, productImage } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isError, isCreatedProduct, isLoading, message} = useSelector((state) => state.products)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onImageChange = (e) => {
        const imageFile = e.target.files[0];

        setFormData({
            ...formData,
            productImage: imageFile,
        });
    };

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (isCreatedProduct)
        {
            if (!isLoading)
            {
                navigate("/produits")
                toast.success("Votre produit a été ajouté !")
            }
        }

        dispatch(resetProducts())

    }, [isError, isCreatedProduct, isLoading, dispatch, navigate, message]);

    const onSubmit = (e) =>
    {
        e.preventDefault()

        const formDataWithImage = new FormData();
        formDataWithImage.append('name', name.toLowerCase());
        formDataWithImage.append('description', description);
        formDataWithImage.append('productImage', productImage);

        dispatch(addProduct(formDataWithImage))
    }

    return (
        <div className="addproduct">
            <div className="title">
                <h2>Ajouter un produit</h2>
            </div>
            <form action="" onSubmit={onSubmit}>
                <div className="input-box">
                    <label htmlFor="name">Nom du produit</label>
                    <input type="text" name="name" id="name" onChange={onChange} value={name}/>
                </div>

                <div className="input-box">
                    <label htmlFor="description">Description du produit</label>
                    <textarea id="description" name="description" onChange={onChange} value={description}/>
                </div>

                <input
                    type="file"
                    name="productImage"
                    id="productImage"
                    accept="image/*"
                    onChange={onImageChange}
                />

                <button type="submit">Ajouter le produit</button>
            </form>
        </div>
    );
};

export default Addproduct;