const asyncHandler = require('express-async-handler')
const Products = require('../models/productsModel')
const Options = require('../models/optionsModel')
const Users = require("../models/usersModel");

// @desc Get all products
// @route GET /api/options/all
// Access public
const getAllOptions = asyncHandler(async (req, res) => {
    const products = await Option.find()
    res.status(200).json(products)
})

// @desc Get all options from product
// @route GET /api/options/all
// Access public
const getProductOptions = asyncHandler(async (req, res) => {

    const { product_id } = req.body;

    const productOptions = await Options.find({product_id})

    res.status(200).json(productOptions)
})


// @desc ADD Product
// @route POST /api/options/add
// Access public
const addOption = asyncHandler(async (req, res) => {
    const { product_id, pack_amount, amount } = req.body;

    if (!product_id || !pack_amount || !amount) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;  // Ajoutez cette ligne pour arrêter l'exécution si les champs ne sont pas valides.
    }

    const existingPackAmount = await Options.findOne({ pack_amount });

    if (existingPackAmount) {
        res.status(400).json({ message: "Un produit avec le même nombre de pack existe déjà !" });
        return;  // Ajoutez cette ligne pour arrêter l'exécution si le produit existe déjà.
    }

    if (amount < 0) {
        res.status(400).json({ message: "Votre stock initial doit être au minimum égal à 0 !" });
        return;  // Ajoutez cette ligne pour arrêter l'exécution si le stock initial est invalide.
    }

    const newOption = await Products.create({
        product_id,
        pack_amount,
        amount
    });

    if (newOption) {
        res.status(200).json(newOption);
    } else {
        res.status(400).json({ message: "Erreur lors de la création de l'article, veuillez réessayer." });
    }
});

// @desc Update option
// @route PUT /api/options/edit/:id
// Access Private
const updateOption = asyncHandler(async (req, res) => {
    const option = await Products.findById(req.params.id)

    if (!option) {
        res.status(400)
        throw new Error("Option non trouvé.")
    }

    if (!Users.findById(req.user.id).is_admin) {
        res.status(400)
        throw new Error("Utilisateur non autorisé")
    }

    const updatedOption = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedOption)
})



// @desc Update product
// @route DELETE /api/options/delete/:id
// Access Private
const deleteOption = asyncHandler(async (req, res) => {
    const option = await Options.findById(req.params.id)

    if (!option) {
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

    await Options.findByIdAndRemove(req.params.id)
    res.status(200).json({id: req.params.id})
})





module.exports = {
    getAllOptions,
    addOption,
    getProductOptions,
    updateOption,
    deleteOption
}