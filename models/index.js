const sequelize = require("../config/db");
const User = require("./User");
const Plant = require("./Plant");

// Kapcsolatok (később bővítjük)
// pl. User.hasMany(Order), Plant.hasMany(WikiArticle)

module.exports = {
  sequelize,
  User,
  Plant,
};
