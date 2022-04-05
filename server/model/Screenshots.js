/*
  Création du schéma de données pour les screenshots
  avec trois champs, un auteur, une description et 
  l'url de l'image.
*/

const mongoose = require("mongoose");

const screenshotsSchema = mongoose.Schema({
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

/*
  Exportation du schéma en tant que modèle Mongoose,le 
  rendant disponible dans toute l'application Express.
*/
module.exports = mongoose.model("Screenshots", screenshotsSchema);
