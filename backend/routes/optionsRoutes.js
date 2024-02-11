const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")
const {getAllOptions, addOption, updateOption, deleteOption, getProductOptions, getSpecificOption, updateAmountOption} = require("../controllers/optionsController");

router.get("/all", getAllOptions)
router.get("/product/:id", getProductOptions)
router.get("/option/:id", getSpecificOption)
router.post("/add", protect, addOption)
router.put("/edit/:id", updateOption)
router.delete("/delete/:id", protect, deleteOption)
router.put("/editAmount/:id", protect, updateAmountOption)

module.exports = router