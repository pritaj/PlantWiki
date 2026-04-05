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
  deleteArticle,
} = require("../controllers/wikiController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Publikus végpontok
router.get("/", getAllArticles);
router.get("/diseases", getAllDiseases);
router.get("/diseases/:id", getDiseaseById);
router.get("/:slug", getArticleBySlug);

// Védett végpontok (csak admin)
router.post("/", adminMiddleware, upload.single("image"), createArticle);
router.put("/:id", adminMiddleware, upload.single("image"), updateArticle);
router.delete("/:id", adminMiddleware, deleteArticle);
router.post("/diseases", adminMiddleware, createDisease);

module.exports = router;
