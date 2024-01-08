const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser, checkUser, getAllUsers} = require("../controllers/usersController")
const { protect } = require("../middleware/authMiddleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/checkUser", checkUser)
router.get("/me", protect, getUser)
router.get("/all", getAllUsers)

module.exports = router