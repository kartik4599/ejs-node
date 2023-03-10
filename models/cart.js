const Sequelize = require('sequelize');

const DB = require('../util/database');

const Cart = DB.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
