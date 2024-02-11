const mongoose = require("mongoose")

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Merci d'entrer un nom"],
        trim: true,
        minlength: [3, "Le nom de votre produit doit contenir 3 caractères"]
    },
    description: {
        type: String,
        required: [true, "Veuillez saisir une description"],
        minlength: [20, "La description doit contenir au minimum 20 caractères"],
        trim: true
    },
    productImage: {
        type: String,
        required: [true, "Veuillez joindre une image"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Products', productsSchema)