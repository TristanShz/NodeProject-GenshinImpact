const Screenshot = require("../model/Screenshot");

const screenshotServices = require("../services/screenshots");

//Contrôleur de la route GET /api/screenshots
exports.getScreenshots = async (req, res) => {
  try {
    const screenshots = await screenshotServices.list();
    if (screenshots) res.status(200).send(screenshots);
  } catch (error) {
    res.send(400).send(error);
  }
};

//Contrôleur de la route POST /api/screenshots
exports.addScreenshot = (req, res) => {
  try {
    const screenshot = screenshotServices.add({
      author: req.body.author,
      description: req.body.description,
      image: req.file.filename,
    });
    if (screenshot.ok)
      res.status(201).json({ message: "Created screenshot successfully !" });
  } catch (error) {
    res.send(400).send(error);
  }
};

//Contrôleur de la route DELETE /api/screenshots
exports.deleteScreenshot = (req, res) => {
  try {
    const deletedScreenshot = screenshotServices.delete(req.params.id);
    if (deletedScreenshot.ok)
      res.status(200).json({ message: "Deleted screenshot successfully !" });
  } catch (error) {
    res.send(400).send(error);
  }
};

//Contrôleur de la route PUT /api/screenshots
exports.updateScreenshot = (req, res) => {
  if (req.file) {
    try {
      const updatedScreenshot = screenshotServices.add(req.params.id, {
        author: req.body.author,
        description: req.body.description,
        image: req.file.filename,
      });
      if (updatedScreenshot)
        res.status(200).json({ message: "Updated screenshot successfully !" });
    } catch (error) {
      res.send(400).send(error);
    }
  } else {
    try {
      const updatedScreenshot = screenshotServices.add(req.params.id, {
        author: req.body.author,
        description: req.body.description,
      });
      if (updatedScreenshot)
        res.status(200).json({ message: "Updated screenshot successfully !" });
    } catch (error) {
      res.send(400).send(error);
    }
  }
};
