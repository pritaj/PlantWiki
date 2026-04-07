const {
  User,
  Plant,
  Product,
  Order,
  WikiArticle,
  Review,
} = require("../models");
const sequelize = require("../config/db");

// Statisztikák
const getStats = async (req, res) => {
  try {
    const userCount = await User.count();
    const plantCount = await Plant.count();
    const productCount = await Product.count();
    const orderCount = await Order.count();
    const wikiCount = await WikiArticle.count();
    const reviewCount = await Review.count();

    const revenue = await Order.sum("total_price", {
      where: { status: "teljesítve" },
    });

    const orderStats = await Order.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      group: ["status"],
      raw: true,
    });

    const plantStats = await Plant.findAll({
      attributes: [
        "type",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      group: ["type"],
      raw: true,
    });

    const productStats = await Product.findAll({
      attributes: [
        "category",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      group: ["category"],
      raw: true,
    });

    res.json({
      counts: {
        users: userCount,
        plants: plantCount,
        products: productCount,
        orders: orderCount,
        wiki: wikiCount,
        reviews: reviewCount,
        revenue: revenue || 0,
      },
      orderStats,
      plantStats,
      productStats,
    });
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba!", error: err.message });
  }
};

// Összes felhasználó listázása
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba!", error: err.message });
  }
};

// Felhasználó szerepkör módosítása
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Felhasználó nem található!" });
    }
    await user.update({ role: req.body.role });
    res.json({ message: "Szerepkör frissítve!", user });
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba!", error: err.message });
  }
};

// Felhasználó törlése
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Felhasználó nem található!" });
    }
    if (user.role === "admin") {
      return res
        .status(400)
        .json({ message: "Admin felhasználót nem lehet törölni!" });
    }
    await user.destroy();
    res.json({ message: "Felhasználó törölve!" });
  } catch (err) {
    res.status(500).json({ message: "Szerver hiba!", error: err.message });
  }
};

module.exports = { getStats, getUsers, updateUserRole, deleteUser };
