const asyncHandler = require('express-async-handler')
const Products = require('../models/productsModel')
const Users = require("../models/usersModel");

// @desc Get all products
// @route GET /api/products/all
// Access public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Products.find()
    res.status(200).json(products)
})


const getSpecificProduct = asyncHandler(async (req, res) => {

    const id = req.params.id

    const product = await Products.findById({_id: id})

    if (!product)
    {
        return res.status(400).json({message: "Produit non trouvé : " + id})
    }

    res.status(200).json(product)
})

// @desc ADD Product
// @route POST /api/products/add
// Access public
const addProduct = asyncHandler(async (req, res) => {

    const { name, description } = req.body;

    if (!name || !description) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;  // Ajoutez cette ligne pour arrêter l'exécution si les champs ne sont pas valides.
    }

    const existingProduct = await Products.findOne({ name });

    if (existingProduct) {
        res.status(400).json({ message: "Un produit avec le même nom existe déjà !" });
        return;  // Ajoutez cette ligne pour arrêter l'exécution si le produit existe déjà.
    }

    const newProduct = await Products.create({
        name,
        description
    });

    if (newProduct) {
        res.status(200).json(newProduct);
    } else {
        res.status(400).json({ message: "Erreur lors de la création de l'article, veuillez réessayer." });
    }
});

// @desc Update product
// @route PUT /api/products/edit/id
// Access Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error("Produit non trouvé.")
    }

    if (!Users.findById(req.user.id).is_admin) {
        res.status(400)
        throw new Error("Utilisateur non autorisé")
    }

    const updatedArticle = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedArticle)
})

// @desc Update product
// @route DELETE /api/products/delete:id
// Access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error("Produit non trouvé.")
    }

    if (!req.user) {
        res.status(400)
        throw new Error("Utilisateur non trouvé.")
    }

    if (!req.user.is_admin) {
        res.status(400)
        throw new Error("Utilisateur non autorisé!")
    }

    await Products.findByIdAndRemove(req.params.id)
    res.status(200).json({id: req.params.id})
})





module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getSpecificProduct
}