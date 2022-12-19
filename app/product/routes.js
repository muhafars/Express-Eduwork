const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads" });
const connection = require("../../config/mysql");
const port = process.env.PORT ? process.env.PORT : 3000; //? membuat  server local
const productsController = require("./controller");

// ? === Find ===
router.get("/products", productsController.index);
router.get("/products/:id", productsController.details);
// ? === Send ===
router.post("/products/", upload.single("image"), productsController.store);

module.exports = { router, port };
