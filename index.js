const express = require("express");
const connectDB = require("./database/connectDB");
const cors = require("cors");
require("dotenv").config();
const app = express();
const users = require("./routes/api/users");
const project = require("./routes/api/project")
const transcript = require("./routes/api/transcripts")
const bodyParser = require("body-parser");

connectDB();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
// app.use(express.json());

app.use("/api/user", users);
app.use("/api/project", project);
app.use("/api/transcript", transcript);

app.use("/", (req, res) => {
  res.send("API is running");
});
const PORT = process.env.PORT || 1821;

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
