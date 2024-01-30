const mongoose = require("mongoose")

const optionsSchema = mongoose.Schema({
    product_id: {
        type: String,
        required: [true, "Veuillez saisir un id de produit"],
        trim: true
    },
    pack_amount: {
        type: Number,
        required: [true, "Veuillez saisir un montant de pack"],
        trim: true
    },
    initial_amount: {
        type: Number,
        required: [true, "Veuillez saisir le montant initial"],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Veuillez saisir le montant actuel"],
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Options', optionsSchema)