const express = require("express");
const router = express.Router();
const {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
} = require("../controllers/plantController");
const authMiddleware = require("../middleware/authMiddleware");

// Publikus végpontok (nem kell bejelentkezés)
router.get("/", getAllPlants);
router.get("/:id", getPlantById);

// Védett végpontok (kell token)
router.post("/", authMiddleware, createPlant);
router.put("/:id", authMiddleware, updatePlant);
router.delete("/:id", authMiddleware, deletePlant);

module.exports = router;
