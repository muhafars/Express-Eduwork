const path = require("path");
const Product = require("./model");
const fs = require("fs");

const findAll = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const findFilter = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const storeItem = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../public/uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.create({ name, price, stock, status, image_url: `http:localhost:4000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};
const updateItem = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  const { id } = req.params;
  if (image) {
    const target = path.join(__dirname, "../../public/uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.findByIdAndUpdate(id, { name, price, stock, status, image_url: `http:localhost:4000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};
const destroyItem = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = { findAll, storeItem, findFilter, updateItem, destroyItem };
