const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
      userId: req.user.id,
    })
    .then((data) => {
      console.log("Added Product");
      res.redirect("/");
    })
    .catch((e) => console.log(e));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log(editMode);
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  if (!prodId) return res.redirect("/");

  // Product.findByPk(prodId)
  req.user.getProducts({where:{id:prodId}})
    .then((data) => {
      console.log(data);
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: data[0],
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log({ prodId, title, imageUrl, description, price });

  Product.findByPk(prodId)
    .then((product) => {
      (product.title = title),
        (product.imageUrl = imageUrl),
        (product.price = price),
        (product.description = description);
      return product.save();
    })
    .then((result) => {
      console.log("updated product");
      res.redirect("/");
    })
    .catch((e) => console.log(e));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then((data) => {
      res.render("admin/products", {
        prods: data,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((e) => console.log(e));
};

exports.postDelete = (req, res, next) => {
  console.log("delete", req.body.productId);
  Product.findByPk(req.body.productId)
    .then((data) => {
      return data.destroy();
    })
    .then(() => {
      console.log("product deleted");
      res.redirect("/");
    })
    .catch((e) => console.log(e));
};
