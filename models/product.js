const DB = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if (!this.id) {
      return DB.execute(
        "INSERT INTO products (title,price,descriptionl,imageUrl) VALUES (?,?,?,?)",
        [this.title, this.price, this.description, this.imageUrl]
      );
    } else {
      return DB.execute(
        "UPDATE products SET products.title=? , products.price=? , products.descriptionl=? , products.imageUrl=? WHERE products.id=? ",
        [this.title, this.price, this.description, this.imageUrl, this.id]
      );
    }
  }

  static fetchAll() {
    return DB.execute("SELECT * FROM products");
  }

  static findById = (id) => {
    return DB.execute("SELECT * FROM products WHERE products.id=?", [id]);
  };

  static deleteById = (id) => {
    return DB.execute("DROP * FROM products WHERE products.id=?", [id]);
  };
};
