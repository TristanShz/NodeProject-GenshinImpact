const path = require("path");
const connect = require("./config/db.config");
const bodyParser = require("body-parser");
const cors = require("cors");
//Connexion à la base de données
connect().catch((err) => console.log(err));

//Configuration de express
const express = require("express");
const app = express();
const screenshotsApiRoutes = require("./routes/screenshots_Api");
const distDir = "../src";

app.use("/pages", express.static(path.join(__dirname, distDir, "/pages")));
app.use("/assets", express.static(path.join(__dirname, distDir, "/assets")));
app.use("/uploads", express.static(path.join(__dirname, distDir, "/uploads")));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

app.use("/api/screenshots", screenshotsApiRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "/index.html"));
});

app.get("/library", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "/pages/library.html"));
});

module.exports = app;
