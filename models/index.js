const sequelize = require("../config/db");
const User = require("./User");
const Plant = require("./Plant");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const WikiArticle = require("./WikiArticle");
const Disease = require("./Disease");
const Nutrient = require("./Nutrient");

// Kapcsolatok
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

Plant.hasMany(WikiArticle, { foreignKey: "plantId" });
WikiArticle.belongsTo(Plant, { foreignKey: "plantId" });

Plant.hasOne(Nutrient, { foreignKey: "plantId" });
Nutrient.belongsTo(Plant, { foreignKey: "plantId" });

module.exports = {
  sequelize,
  User,
  Plant,
  Product,
  Order,
  OrderItem,
  WikiArticle,
  Disease,
  Nutrient,
};
