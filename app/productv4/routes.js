const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads" });
const productController = require("./controller");

router.get("/products", productController.findAll);
router.get("/products/:id", productController.findFilter);
router.post("/products", upload.single("image"), productController.storeItem);
router.put("/products/:id", upload.single("image"), productController.updateItem);
router.delete("/products/:id", productController.destroyItem);

module.exports = router;
