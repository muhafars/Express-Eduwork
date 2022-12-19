const connection = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

// ? Insialisasi Query
const findQuery = "SELECT * FROM products";
const sendQuery = "INSERT INTO products";

const resIndex = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "Failed",
        response: error,
      });
    } else {
      res.send({
        status: "Success",
        response: result,
      });
    }
  };
};

const index = (req, res) => {
  connection.query({ sql: findQuery }, resIndex(res));
};

const details = (req, res) => {
  const id = req.params.id;
  connection.query(
    {
      sql: `${findQuery} WHERE id = ?`,
      values: [id],
    },
    resIndex(res)
  );
};

const store = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  console.log("image ===> ", image);
  if (image) {
    const target = path.join(
      __dirname,
      "../../public/uploads",
      image.originalname
    );
    fs.renameSync(image.path, target);
    connection.query(
      {
        sql: `${sendQuery} {users_id, name, price, stock, status, image_url} VALUES (?, ?, ?, ?, ?, ?)`,
        values: [
          parseInt(users_id),
          name,
          price,
          stock,
          status,
          `http:localhost:3000/public/${image.originalname}`,
        ],
      },
      resIndex(res)
    );
  }
};
module.exports = { index, details, store };
