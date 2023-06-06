require("dotenv").config({path:'../.env'});
const mongoose = require("mongoose");
mongoose                                                    //Database Connection
  .connect("mongodb+srv://mayankjain1784:gdsc123@cluster0.gzr4giu.mongodb.net/treatus", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error(err));
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.on("connected", () => console.log("Database connected!"));

module.exports = {db};