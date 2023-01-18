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
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(res.redirect("/"))
    .catch((e) => {
      console.log(e);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log(editMode);
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  if (!prodId) return res.redirect("/");
  Product.findById(prodId)
    .then(([data]) => {
      console.log(data);
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: data,
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

  const updatedProduct = new Product(
    prodId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct
    .save()
    .then(([data]) => res.redirect("/"))
    .catch((e) => console.log(e));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([data]) => {
      res.render("admin/products", {
        prods: data,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch();
};

exports.postDelete = (req, res, next) => {
  console.log("delete", req.body.productId);
  Product.deleteById(req.body.productId);
  res.redirect("/");
};
