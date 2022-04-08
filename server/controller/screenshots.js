const screenshotServices = require("../services/screenshots");

//Contrôleur de la route GET /api/screenshots
exports.getScreenshots = async (req, res) => {
  const screenshots = await screenshotServices.list();
  if (!screenshots) {
    return res
      .sendStatus(400)
      .json({ message: "Error when trying to get the screenshots from db" });
  }
  res.send(screenshots);
};

//Contrôleur de la route POST /api/screenshots
exports.addScreenshot = async (req, res) => {
  const newScreenshot = {
    author: req.body.author,
    description: req.body.description,
    image: req.file.filename,
  };
  const screenshot = await screenshotServices.add(newScreenshot);
  console.log(screenshot);
  if (!screenshot) {
    return res.sendStatus(400).send({ message: `Error` });
  }
  res.json({ message: "Created screenshot successfully !" });
};

//Contrôleur de la route DELETE /api/screenshots
exports.deleteScreenshot = async (req, res) => {
  const deletedScreenshot = await screenshotServices.delete(req.params.id);

  if (deletedScreenshot.deletedCount === 0) {
    return res
      .sendStatus(400)
      .send({ message: `can't find Screenshot with ID ${req.params.id}` });
  }
  res.json({ message: "Deleted screenshot successfully !" });
};

//Contrôleur de la route PUT /api/screenshots
exports.updateScreenshot = async (req, res) => {
  if (req.file) {
    const updatedScreenshot = await screenshotServices.update(req.params.id, {
      author: req.body.author,
      description: req.body.description,
      image: req.file.filename,
    });
    if (updatedScreenshot.modifiedCount === 0) {
      return res.sendStatus(400).send({
        message: `Error when trying to update the screenshot with ID ${req.params.id}`,
      });
    }
    res.json({ message: "Updated screenshot successfully !" });
  } else {
    const updatedScreenshot = await screenshotServices.update(req.params.id, {
      author: req.body.author,
      description: req.body.description,
    });
    if (updatedScreenshot.modifiedCount === 0) {
      return res.sendStatus(400).send({
        message: `Error when trying to update the screenshot with ID ${req.params.id}`,
      });
    }

    res.json({ message: "Updated screenshot successfully !" });
  }
};
