const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/plants", (req, res) => {
  res.render("admin/plants");
});

router.get("/products", (req, res) => {
  res.render("admin/products");
});

router.get("/wiki", (req, res) => {
  res.render("admin/wiki");
});

router.get("/orders", (req, res) => {
  res.render("admin/orders");
});

module.exports = router;
