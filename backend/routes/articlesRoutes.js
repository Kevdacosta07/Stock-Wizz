const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")
const {getAllArticles, getUserArticles, setArticles, updateArticle, deleteArticle} = require("../controllers/articlesController");

router.get("/all", getAllArticles)
router.get("/user", protect, getUserArticles)
router.post("/add", protect, setArticles)
router.put("/edit/:id", protect, updateArticle)
router.delete("/delete/:id", protect, deleteArticle)

module.exports = router
