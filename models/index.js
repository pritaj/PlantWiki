const sequelize = require("../config/db");
const User = require("./User");
const Plant = require("./Plant");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Kapcsolatok
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  sequelize,
  User,
  Plant,
  Product,
  Order,
  OrderItem,
};
