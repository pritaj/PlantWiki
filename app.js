const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));

// Routes
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const shopRoutes = require("./routes/shopRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/shop", shopRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🌿 PlantWiki API fut!" });
});

module.exports = app;
