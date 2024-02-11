const asyncHandler = require('express-async-handler')
const Options = require('../models/optionsModel')

// @desc Get all products
// @route GET /api/options/all
// Access public
const getAllOptions = asyncHandler(async (req, res) => {
    const options = await Options.find()
    res.status(200).json(options)
})

// @desc Get a specific option
// @route GET /api/options/:id
// Access public
const getSpecificOption = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const option = await Options.findById({_id: id})

    if (!option)
    {
        return res.status(400).json({message: "Option non trouvée : " + id})
    }

    res.status(200).json(option)
})

// @desc Get all options from product
// @route GET /api/options/all
// Access public
const getProductOptions = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const productOptions = await Options.find({product_id: id})

    productOptions.sort((a, b) => a.pack_amount - b.pack_amount);

    res.status(200).json(productOptions)
})


// @desc ADD Product
// @route POST /api/options/add
// Access public
const addOption = asyncHandler(async (req, res) => {
    const { product_id, pack_amount, amount, initial_amount } = req.body;

    console.log(initial_amount)

    if (!product_id || !pack_amount || !amount || !initial_amount) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;  // Ajoutez cette ligne pour arrêter l'exécution si les champs ne sont pas valides.
    }

    const existingPackAmount = await Options.findOne({ product_id, pack_amount });

    if (existingPackAmount) {
        res.status(400).json({ message: "Une option avec le même nombre d'unité existe déjà !" });
        return;  // Ajoutez cette ligne pour arrêter l'exécution si le produit existe déjà.
    }

    if (initial_amount < 0) {
        res.status(400).json({ message: "Votre stock initial doit être au minimum égal à 0 !" });
        return;  // Ajoutez cette ligne pour arrêter l'exécution si le stock initial est invalide.
    }

    const newOption = await Options.create({
        product_id,
        pack_amount,
        amount,
        initial_amount
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
    const option = await Options.findById(req.params.id)

    const { product_id, pack_amount, initial_amount, amount } = req.body

    if (!product_id || !pack_amount || !initial_amount || !amount) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;
    }

    const existingPackAmount = await Options.findOne({ product_id, pack_amount });

    if (existingPackAmount) {
        res.status(400).json({ message: "Une option avec le même nombre d'unité existe déjà !" });
        return;
    }

    if (amount < 0)
    {
        res.status(400).json({ message: "Le stock ne peux pas être inférieur à 0" });
        return;
    }

    if (!option) {
        res.status(400).json({message: "Option non trouvé."})
    }

    /*if (!(req.user).is_admin) {
        res.status(400).json({message: "Vous n'avez pas la permission suffisante"})
    }*/

    const updatedOption = await Options.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedOption)
})

// @desc Update option amount
// @route PUT /api/options/editAmount/:id
// Access Private
const updateAmountOption = asyncHandler(async (req, res) => {
    const option = await Options.findById(req.params.id);

    if (!option) {
        res.status(404).json({ message: "Option non trouvé." });
        return;
    }

    const amount = parseFloat(req.body.amount);

    if (isNaN(amount) || amount < 0) {
        res.status(400).json({ message: "Veuillez fournir une quantité valide et non négative" });
        return;
    }

    option.amount = amount;

    if (!isNaN(req.body.initial_amount))
    {
        option.initial_amount = req.body.initial_amount
    }

    const updatedOption = await option.save();

    res.status(200).json({ option: updatedOption });
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
    deleteOption,
    getSpecificOption,
    updateAmountOption
}