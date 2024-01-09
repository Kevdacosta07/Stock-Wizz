const mongoose = require("mongoose")

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Merci d'entrer un nom"],
        trim: true,
        minlength: [3, "Le nom de votre produit doit contenir 3 caractères"]
    },
    initial_amount: {
        type: Number,
        required: [true, "Merci d'entrer un montant minimum"],
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Products', productsSchema)