const express = require("express");
const path = require("path");

const app = express();

//Utilisation de mongoose pour se connecter à MongoDB
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  mongoose
    .connect(
      "mongodb+srv://natix:Mttz4fr5jrjC9Q8@genshinproject.jrr5l.mongodb.net/genshinProject?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));
}
//Configuration de express
const distDir = "../src/";
app.use("/pages", express.static(path.join(__dirname, distDir, "/pages")));
app.use("/assets", express.static(path.join(__dirname, distDir, "/assets")));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "index.html"));
});

app.get("/library", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "/pages/library.html"));
});

module.exports = app;
