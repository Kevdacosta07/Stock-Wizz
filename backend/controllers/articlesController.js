const asyncHandler = require('express-async-handler')
const Articles = require('../models/articlesModel')


// @desc Get all Articles
// @route GET /api/articles/all
// Access public
const getAllArticles = asyncHandler(async (req, res) => {
    const articles = await Articles.find()
    res.status(200).json(articles)
})

// @desc Get Articles from User
// @route GET /api/articles
// Access private
const getUserArticles = asyncHandler(async (req, res) => {
    const articles = await Articles.find({user: req.user.id})

    if (articles) {
        res.status(200).json(articles)
    }

    else {
        res.status(401)
        throw new Error("Aucun article n'a été trouvé")
    }
})

// @desc Post Articles
// @route POST /api/articles/add
// Access private
const setArticles = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content){
        res.status(400)
        throw new Error ("Merci de remplir tous les champs")
    }

    const article = await Articles.create({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content
    })

    if (article) {
        res.status(200).json(article)
    }

    else {
        res.status(400)
        throw new Error("Erreur lors de la création de l'article, veuillez réessayer.")
    }
})

// @desc Update Article
// @route PUT /api/articles/edit/id
// Access Private
const updateArticle = asyncHandler(async (req, res) => {
    const article = await Articles.findById(req.params.id)

    if (!article) {
        res.status(400)
        throw new Error("Article non trouvé.")
    }

    if (!req.user) {
        res.status(400)
        throw new Error("Utilisateur non trouvé.")
    }

    if (article.user.toString() !== req.user.id) {
        res.status(400)
        throw new Error("Utilisateur non autorisé")
    }

    const updatedArticle = await Articles.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedArticle)
})


// @desc Delete Article
// @route DELETE /api/articles/delete/id
// Access Private

const deleteArticle = asyncHandler(async (req, res) => {
    const article = await Articles.findById(req.params.id)

    if (!article) {
        res.status(400)
        throw new Error("Article non trouvé.")
    }

    if (!req.user) {
        res.status(400)
        throw new Error("Utilisateur non trouvé.")
    }

    if (article.user.toString() !== req.user.id) {
        res.status(400)
        throw new Error("Utilisateur non autorisé")
    }

    await Articles.findByIdAndRemove(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getAllArticles,
    getUserArticles,
    setArticles,
    deleteArticle,
    updateArticle
}