const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  createOrder,
  getMyOrders,
} = require("../controllers/shopController");
const authMiddleware = require("../middleware/authMiddleware");

// Publikus végpontok
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

// Védett végpontok (kell token)
router.post("/products", authMiddleware, createProduct);
router.post("/checkout", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getMyOrders);

module.exports = router;
