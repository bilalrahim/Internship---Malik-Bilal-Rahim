const express = require("express");
const app = express();

// Points
app.use("/points", require("./points/points.routes"));


module.exports = app;