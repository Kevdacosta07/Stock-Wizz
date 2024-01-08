const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    title: {
        type: String,
        required: [true, "Merci de saisir un titre"],
        trim: true,
        minLength: [2, "Le titre doit contenir minimum 2 caractères !"]
    },

    content: {
        type: String,
        required: [true, "Veuillez saisir un contenu"],
        minLength: [5, "Votre contenu doit contenir au moins 5 caractères"]
    }

}, {timestamps: true})

module.exports = mongoose.model("Articles", articlesSchema)