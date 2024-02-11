const express = require("express");
const router = express.Router();
const { loginUser, getUser, checkUser, getAllUsers, deleteUser, createUser, getSpecificUser, updateUser} = require("../controllers/usersController")
const { protect } = require("../middleware/authMiddleware")

router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/checkUser", checkUser)
router.get("/me", protect, getUser)
router.get("/all", getAllUsers)
router.get("/user/:id", getSpecificUser)
router.delete("/delete/:id", protect, deleteUser)
router.put("/edit/:id", protect, updateUser)

module.exports = router