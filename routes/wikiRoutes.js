const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  getAllDiseases,
  getDiseaseById,
  createDisease,
} = require("../controllers/wikiController");
const authMiddleware = require("../middleware/authMiddleware");

// Publikus végpontok
router.get("/", getAllArticles);
router.get("/:slug", getArticleBySlug);
router.get("/diseases", getAllDiseases);
router.get("/diseases/:id", getDiseaseById);

// Védett végpontok (csak admin)
router.post("/", authMiddleware, createArticle);
router.put("/:id", authMiddleware, updateArticle);
router.post("/diseases", authMiddleware, createDisease);

module.exports = router;
