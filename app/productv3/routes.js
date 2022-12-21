const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads" });
const productController = require("./controller");

router.get("/products", productController.index);
router.get("/products/:id", productController.filterView);
router.post("/products", upload.single("image"), productController.storeView);

module.exports = router;
