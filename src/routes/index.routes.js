const express = require("express");
const app = express();

// Points
app.use("/points", require("./points/points.routes"));

app.get("/", (req, res) => {
  res.send("Hello! The server is running 🚀");
});

module.exports = app;