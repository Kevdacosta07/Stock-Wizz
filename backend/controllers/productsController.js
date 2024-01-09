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


// @desc ADD Product
// @route POST /api/products/all
// Access public
const addProduct = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.initial_amount){
        res.status(400).json({message: "Veuillez remplir tous les champs"})
    }

    const product = await Products.create({
        name: req.body.name,
        initial_amount: req.body.initial_amount
    })

    if (product) {
        res.status(200).json(product)
    }

    else {
        res.status(400).json({message: "Erreur lors de la création de l'article, veuillez réessayer."})
    }
})

// @desc Update product
// @route PUT /api/products/edit/id
// Access Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Articles.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error("Article non trouvé.")
    }

    if (!Users.findById(req.user.id).is_admin) {
        res.status(400)
        throw new Error("Utilisateur non autorisé")
    }

    const updatedArticle = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedArticle)
})





module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
}