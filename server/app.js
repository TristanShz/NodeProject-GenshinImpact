const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const Screenshots = require("./model/Screenshots");
const bodyParser = require("body-parser");
const fs = require("fs");
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
app.use("/uploads", express.static(path.join(__dirname, distDir, "/uploads")));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "index.html"));
});

app.get("/library", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "/pages/library.html"));
});

//CREATE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, distDir, "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

app.post("/api/screenshots", upload.single("image"), (req, res, next) => {
  const screenshot = new Screenshots({
    author: req.body.author,
    description: req.body.description,
    image: req.file.filename,
  });
  //Sauvegarde du screenshot dans la base de données
  screenshot
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created screenshot successfully",
        createdProduct: {
          author: result.author,
          description: result.description,
          image: result.image,
          _id: result._id,
          request: {
            type: "POST",
            url: "http://localhost:3000/api/screenshots",
          },
        },
      });
    })
    .catch((error) => res.status(400).json({ error }));
});

//READ
app.get("/api/screenshots", (req, res, next) => {
  Screenshots.find()
    .then((screenshots) => res.send(screenshots))
    .catch((error) => res.status(400).json({ error }));
});

//UPDATE
app.put("/api/screenshots/:id", upload.single("image"), (req, res, next) => {
  if (req.file) {
    Screenshots.findOne({ _id: req.params.id }, (err, screenshot) => {
      fs.unlinkSync(
        path.join(__dirname, distDir, "/uploads/", screenshot.image)
      );
    });

    Screenshots.updateOne(
      { _id: req.params.id },
      {
        author: req.body.author,
        description: req.body.description,
        image: req.file.filename,
      }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Screenshots.updateOne(
      { _id: req.params.id },
      {
        author: req.body.author,
        description: req.body.description,
      }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  }
});

//DELETE
app.delete("/api/screenshots/:id", (req, res, next) => {
  /*On retrouve le screenshot concerné par la requête, afin de supprimer
  son image associée dans le dossier uploads grâce au FileSystem. Puis le 
  screenshot est supprimer de la base de donné avec la méthode .deleteOne de 
  mongoose */
  Screenshots.findOne({ _id: req.params.id }, (err, screenshot) => {
    fs.unlinkSync(path.join(__dirname, distDir, "/uploads/", screenshot.image));
  });
  Screenshots.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
