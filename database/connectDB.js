const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "dashboard",
    })
    .then(() => {
      console.log("Connected to the Database.");
    })
    .catch((err) => console.error(err));
};

module.exports = connectDB;
