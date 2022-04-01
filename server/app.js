const express = require("express");
const path = require("path");

const app = express();
const Screenshots = require("./model/Screenshots");
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
app.use(express.urlencoded({ extended: true }));
//Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "index.html"));
});

app.get("/library", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "/pages/library.html"));
});

//CREATE
app.post("/api/screenshots", (req, res, next) => {
  console.log(req);
  const screenshot = new Screenshots({
    ...req.body,
  });
  screenshot
    .save()
    .then(() => res.status(201).redirect("/library"))
    .catch((error) => res.status(400).json({ error }));
});

//READ
app.get("/api/screenshots", (req, res, next) => {
  Screenshots.find()
    .then((screenshots) => res.send(screenshots))
    .catch((error) => res.status(400).json({ error }));
});

//DELETE
app.delete("/api/screenshots/:id", (req, res, next) => {
  Screenshots.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});
module.exports = app;
