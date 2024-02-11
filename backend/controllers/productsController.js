const asyncHandler = require('express-async-handler')
const Products = require('../models/productsModel')
const Options = require('../models/optionsModel')
const Transactions = require('../models/transactionModel')
const {join} = require("path");

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

    const productImage = req.files && req.files.productImage;

    if (!name || !description) {
        res.status(400).json({ message: "Veuillez remplir tous les champs !" });
        return;
    }

    if (!productImage)
    {
        res.status(400).json({ message: "Veuillez joindre une image !" });
        return;
    }


    const path = productImage.name.replace(/\s/g, "")

    const uploadPath = join(__dirname, "..", "..", "frontend", "public", "uploads", path);

    productImage.mv(uploadPath, (err) => {
        if (err) {
            res.status(400).json({message: "Erreur lors de la création du fichier"});
        }
    });

    const existingProduct = await Products.findOne({ name });

    if (existingProduct) {
        res.status(400).json({ message: "Un produit avec le même nom existe déjà !" });
        return;
    }

    const newProduct = await Products.create({
        name,
        description,
        productImage: path
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

    const { name, description } = req.body

    if (!name || !description) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;
    }

    if (description.length < 20)
    {
        res.status(400).json({ message: "La description doit faire au moins 20 caractères" });
        return;
    }

    if (!product) {
        res.status(400).json({message: "Produit non trouvé."})
    }

    if (!req.user.is_admin)
    {
        res.status(400).json({message: "Veuillez vous connecter"})
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
        res.status(400).json({message: "Produit non trouvé."})
    }

    if (!req.user) {
        res.status(400).json({message: "Utilisateur non trouvé."})
    }

    if (!req.user.is_admin) {
        res.status(400).json({message: "Utilisateur non autorisé!"})
    }

    await Products.findByIdAndRemove(req.params.id)

    await Options.deleteMany({ product_id: req.params.id })

    await Transactions.deleteMany({ product_id: req.params.id })

    res.status(200).json({id: req.params.id})
})





module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getSpecificProduct
}