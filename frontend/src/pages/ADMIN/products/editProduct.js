import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {addProduct, getSpecificProduct, resetProducts, updateProduct} from "../../../features/products/productSlice";

const EditProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    const { name, description } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {product, isError, isEditedProduct, isLoading, message} = useSelector((state) => state.products)

    const { id } = useParams()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    useEffect(() => {
        dispatch(getSpecificProduct(id))
    }, [id])

    useEffect(() => {
        // Vérifier si specificUser est défini avant d'accéder à ses propriétés
        if (product) {
            setFormData({
                name: product.name ?? '',
                description: product.description ?? '',
            });
        }
    }, [product]);

    useEffect(() => {

        if (isError) {
            toast.error(message)

            dispatch(getSpecificProduct(id))

            // Vérifier si specificUser est défini avant d'accéder à ses propriétés
            if (product) {
                setFormData({
                    name: product.name ?? '',
                    description: product.description ?? '',
                });
            }
        }

        if (isEditedProduct)
        {
            if (!isLoading)
            {
                navigate("/produits")
                toast.success("Votre produit a été modifié !")
            }
        }

        dispatch(resetProducts())

    }, [isError, isEditedProduct, isLoading, dispatch, navigate, message]);

    const onSubmit = (e) =>
    {
        e.preventDefault()

        const productData = {
            name : name.toLowerCase(),
            description: description
        }

        dispatch(updateProduct({ id: id, product: productData }))
    }

    return (
        <div className="addproduct">
            <div className="title">
                <h2>Modifier un produit</h2>
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

                <button type="submit">Appliquer les modifications</button>
            </form>
        </div>
    );
};

export default EditProduct;