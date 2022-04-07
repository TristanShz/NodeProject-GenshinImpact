const path = require("path");
const Screenshot = require("../model/Screenshot");
const fs = require("fs");

//Service de la route GET /api/screenshots
exports.list = () => {
  return Screenshot.find();
};

//Service de la route POST /api/screenshots
exports.add = (screenshotContent) => {
  const screenshot = new Screenshot(screenshotContent);
  screenshot.save().then((result) => {
    return result;
  });
};

//Service de la route DELETE /api/screenshots
exports.delete = (screenshotId) => {
  Screenshot.findOne({ _id: screenshotId }, (err, screenshot) => {
    fs.unlinkSync(path.join(__dirname, ".../src/uploads/", screenshot.image));
  });
  Screenshot.deleteOne({ _id: req.params.id }).then((result) => {
    return result;
  });
};

//Service de la route PUT /api/screenshots
exports.updateWithFile = (screenshotId, screenshot) => {
  Screenshot.findOne({ _id: screenshotId }, (err, screenshot) => {
    fs.unlinkSync(path.join(__dirname, "../src/uploads/", screenshot.image));
  });

  Screenshot.updateOne({ _id: screenshotId }, screenshot).then((result) => {
    return result;
  });
};

exports.update = (screenshotId, screenshot) => {
  Screenshot.updateOne({ _id: screenshotId }, screenshot).then((result) => {
    return result;
  });
};
