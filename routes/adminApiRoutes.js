const express = require("express");
const router = express.Router();
const {
  getStats,
  getUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/stats", adminMiddleware, getStats);
router.get("/users", adminMiddleware, getUsers);
router.put("/users/:id", adminMiddleware, updateUserRole);
router.delete("/users/:id", adminMiddleware, deleteUser);

module.exports = router;
