const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/plants", (req, res) => {
  res.render("plants/index");
});

router.get("/shop", (req, res) => {
  res.render("shop/index");
});

router.get("/wiki", (req, res) => {
  res.render("wiki/index");
});

router.get("/nutrients", (req, res) => {
  res.render("nutrients/index");
});

router.get("/auth/login", (req, res) => {
  res.render("auth/login");
});

router.get("/auth/register", (req, res) => {
  res.render("auth/register");
});

module.exports = router;
