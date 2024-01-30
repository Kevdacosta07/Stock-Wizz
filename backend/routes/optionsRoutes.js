const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")
const {getAllOptions, addOption, updateOption, deleteOption, getProductOptions} = require("../controllers/optionsController");

router.get("/all", getAllOptions)
router.get("/product/:id", getProductOptions)
router.post("/add", protect, addOption)
router.put("/edit/:id", protect, updateOption)
router.delete("/delete/:id", protect, deleteOption)

module.exports = router