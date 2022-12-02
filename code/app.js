// import
const router = require("./routes").router;
const log = require("./middlewares/logger");

// Inisialisasi
const express = require("express");
const app = express();
const path = require("path");

// membuat servers
const port = require("./routes").port;
const server = app.listen(port, () => {
  console.log(`server listening.. on port ${port}`);
});

// membuat routing
app.use("/public", express.static(path.join(__dirname, "uploads"))); // rpute file static ke path url public/nama file static
// middlewres diatas res agar berjalan
app.use(log);
// mengembalikan nilai body yang dikirim dari postman api
app.use(express.urlencoded({ extended: true }));
app.use(router);
// handling error router
app.use((req, res, next) => {
  res.status(404); //tampil ke console web browser
  // membuat tampil ke layar
  res.send({
    status: "failed",
    message: "Resource" + req.originalUrl + "Not Found",
  });
  next();
});
