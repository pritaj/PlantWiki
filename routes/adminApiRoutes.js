const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/stats", adminMiddleware, getStats);

module.exports = router;
