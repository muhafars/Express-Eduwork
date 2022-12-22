const mongoose = require("mongoose");
mongoose.connect(`mongodb://muhafash:admin@localhost:27017/eduwork-mongoose?authSource=admin`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Server is Connected"));
