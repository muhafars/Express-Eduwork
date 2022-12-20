// import
const logger = require("morgan");
const express = require("express");
const app = express();
const path = require("path");
// ? Inisialisasi Server
const productRouter = require("./app/product/routes").router;
const port = require("./app/product/routes").port;

app.listen(port, () => {
  console.log(`server listening.. on port ${port}`);
}); // ? => Membuat server

app.use(logger("dev"));
app.use("/api/v1", productRouter);
app.use(express.urlencoded({ extended: true }));
app.use("/public/", express.static(path.join(__dirname, "./public/uploads"))); //? express static mengarahkan ke page file directory
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "Resource" + req.originalUrl + "Not Found",
  });
  next();
});
