// import
require("./config/mongoose");
const logger = require("morgan");
const express = require("express");
const app = express();
const path = require("path");
// ? Inisialisasi Server
const productRouterV3 = require("./app/productv3/routes");
const productRouterV4 = require("./app/productv4/routes");
const port = process.env.PORT ? process.env.PORT : 4000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/public/", express.static(path.join(__dirname, "./public/uploads")));

app.use("/api/v3", productRouterV3);
app.use("/api/v4", productRouterV4);

app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "Resource" + req.originalUrl + "Not Found",
  });
  next();
});

app.listen(port, () => {
  console.log(`server listening.. on port ${port}`);
});
