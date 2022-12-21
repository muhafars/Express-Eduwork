const { MongoClient } = require("mongodb");
const portDb = "localhost:27017";
const url = `mongodb://eduwork:admin@${portDb}?authSource=admin`; //? authSource= <databaseName>
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB ");
  } catch (err) {
    console.log(err);
  }
})();

const db = client.db("express-eduwork");

module.exports = db;
