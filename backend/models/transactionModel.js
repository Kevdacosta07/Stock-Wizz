const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    product_id: {
        type: String,
        required: [true, "Veuillez saisir un id"],
        trim: true
    },
    product_name: {
        type: String,
        required: [true, "Veuillez saisir un nom de produit"],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Veuillez saisir un montant"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "Veuillez saisir un type"],
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)