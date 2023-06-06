require("dotenv").config();
const mongoose = require("mongoose");
mongoose                                                    //Database Connection
  .connect(process.env.MONGO_CONNECTION, {
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

module.exports = db;