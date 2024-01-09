const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")
const {getAllProducts, addProduct, updateProduct} = require("../controllers/productsController");

router.get("/all", getAllProducts)
router.post("/add", protect, addProduct)
router.put("/edit:id", protect, updateProduct)

module.exports = router