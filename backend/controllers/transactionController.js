const asyncHandler = require('express-async-handler')
const Transactions = require('../models/transactionModel')

// @desc ADD Transaction
// @route POST /api/transactions/add
// Access public
const addTransaction = asyncHandler(async (req, res) => {
    const { product_id, product_name, amount, type } = req.body;

    if (!product_id || !product_name || !amount || !type) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;
    }

    if (amount <= 0) {
        res.status(400).json({ message: "Votre stock initial doit être au minimum égal à 1 !" });
        return;
    }

    const newTransaction = await Transactions.create({
        product_id,
        product_name,
        amount,
        type,
    });

    if (newTransaction) {
        res.status(200).json(newTransaction);
    } else {
        res.status(400).json({ message: "Erreur lors de la création de la transaction, veuillez réessayer." });
    }
});

// @desc Get all transactions
// @route GET /api/transactions/all
// Access public
const getAllTransactions = asyncHandler(async (req, res) => {
    const products = await Transactions.find()
    res.status(200).json(products)
})

module.exports = {
    getAllTransactions,
    addTransaction
}