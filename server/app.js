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

//Route Post qui crée un nouvel objet à partir du model Screenshots et qui l'enregistre dans la BDD
app.post("/api/screenshots", (req, res, next) => {
  console.log(Screenshots);
  console.log(req.body);
  const screenshot = new Screenshots({
    ...req.body,
  });
  screenshot
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/screenshots", (req, res, next) => {
  Screenshots.find()
    .then((screenshots) => res.send(screenshots))
    .catch((error) => res.status(400).json({ error }));
});
module.exports = app;
