const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  createOrder,
  getMyOrders,
  deleteProduct,
  updateOrderStatus,
  getAllOrders,
  updateProduct,
} = require("../controllers/shopController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Publikus végpontok
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

// Védett végpontok (kell token)
router.post("/products", authMiddleware, createProduct);
router.delete("/products/:id", adminMiddleware, deleteProduct);
router.post("/checkout", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getMyOrders);
router.get("/orders/all", adminMiddleware, getAllOrders);
router.put("/orders/:id", adminMiddleware, updateOrderStatus);
router.put("/products/:id", adminMiddleware, updateProduct);

module.exports = router;
