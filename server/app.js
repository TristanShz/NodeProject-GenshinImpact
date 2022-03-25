const express = require("express");
const path = require("path");

const app = express();

//Configuration de express
const distDir = "../src/";
app.use("/pages", express.static(path.join(__dirname, distDir, "/pages")));
app.use("/assets", express.static(path.join(__dirname, distDir, "/assets")));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "index.html"));
});
module.exports = app;
