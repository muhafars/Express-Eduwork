const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads" });
const connection = require("../../config/mysql");
const port = process.env.PORT ? process.env.PORT : 4000; //? membuat  server local
const productsController = require("./controller");

// ? === Find ===
router.get("/products", productsController.index);
router.get("/products/:id", productsController.details);
// ? === Send ===
router.post("/products/", upload.single("image"), productsController.store);
router.put("/products/:id", upload.single("image"), productsController.update);
// ? === Delete ===
router.delete("/products/:id", productsController.destroy);

module.exports = { router, port };
