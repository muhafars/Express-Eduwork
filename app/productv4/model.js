const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field name must be filled"],
    minLength: 3,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: [true, "Price name must be filled"],
    minLength: 1000,
    maxLength: 999999999,
  },
  stock: {
    type: String,
    status: {
      type: Boolean,
      default: true,
    },
  },
  image_url: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
