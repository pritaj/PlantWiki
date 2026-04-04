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
const upload = require("../middleware/uploadMiddleware");

// Publikus végpontok
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

// Védett végpontok
router.post(
  "/products",
  adminMiddleware,
  upload.single("image"),
  createProduct,
);
router.put(
  "/products/:id",
  adminMiddleware,
  upload.single("image"),
  updateProduct,
);
router.delete("/products/:id", adminMiddleware, deleteProduct);
router.post("/checkout", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getMyOrders);
router.get("/orders/all", adminMiddleware, getAllOrders);
router.put("/orders/:id", adminMiddleware, updateOrderStatus);

module.exports = router;
