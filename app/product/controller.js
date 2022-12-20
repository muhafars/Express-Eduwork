const connection = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

// ? Insialisasi Query
const findQuery = "SELECT * FROM products";
const sendQuery = "INSERT INTO products";
const upQuery = "UPDATE products";
const delQuery = "DELETE FROM products";

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
  const { search } = req.query;
  let exec = {};
  if (search) {
    exec = {
      sql: `${findQuery} WHERE name like = ?}`,
      values: [`%${search}%`],
    };
  } else {
    exec = {
      sql: `${findQuery}`,
    };
  }
  connection.query(exec, resIndex(res));
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

const destroy = (req, res) => {
  const id = req.params.id;
  connection.query(
    {
      sql: `${delQuery} WHERE id = ?`,
      values: [id],
    },
    resIndex(res)
  );
};

const store = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../public/uploads", image.originalname);
    fs.renameSync(image.path, target);
    connection.query(
      {
        sql: `${sendQuery} (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
        values: [parseInt(users_id), name, price, stock, status, `http:localhost:3000/public/${image.originalname}`],
      },
      resIndex(res)
    );
  }
};

const update = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  const id = req.params.id;
  let values = [];
  let sql = "";
  if (image) {
    const target = path.join(__dirname, "../../public/uploads", image.originalname);
    (sql = `${upQuery} SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?`),
      (values = [parseInt(users_id), name, price, stock, status, `http:localhost:3000/public/${image.originalname}`, id]);
    fs.renameSync(image.path, target);
  } else {
    (sql = `${upQuery} SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?`),
      (values = [parseInt(users_id), name, price, stock, status, id]);
  }
  connection.query(
    {
      sql,
      values,
    },
    resIndex(res)
  );
};
module.exports = { index, details, store, update, destroy };
