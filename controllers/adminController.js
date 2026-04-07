const {
  User,
  Plant,
  Product,
  Order,
  WikiArticle,
  Review,
} = require("../models");
const sequelize = require("../config/db");

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

module.exports = { getStats };
