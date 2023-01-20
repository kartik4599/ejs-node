const path = require("path");
const DB = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => {
      console.log(e);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

DB.sync()
  .then((data) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) return User.create({ name: "Max", email: "test@gmail.com" });
    return user;
  })
  .then((user) => {
    return user.createCart();
    
  })
  .then((cart) => {
    console.log(cart);
    app.listen(3000);
  })
  .catch((e) => console.log(e));
