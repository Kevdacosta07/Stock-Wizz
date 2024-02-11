const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")
const {addTransaction, getAllTransactions} = require("../controllers/transactionController");

router.post("/add", protect, addTransaction)
router.get("/all", getAllTransactions)


module.exports = router