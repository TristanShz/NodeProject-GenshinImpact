const path = require("path");
const Screenshot = require("../model/Screenshot");
const fs = require("fs");

//Service de la route GET /api/screenshots
exports.list = () => {
  return Screenshot.find();
};

//Service de la route POST /api/screenshots
exports.add = async (screenshotContent) => {
  const screenshot = new Screenshot(screenshotContent);
  const screenshotAdded = await screenshot.save();
  console.log(screenshot === screenshotAdded);
  return screenshot == screenshotAdded;
};

//Service de la route DELETE /api/screenshots
exports.delete = async (screenshotId) => {
  const uploadsFile = fs.readdirSync(path.join(__dirname, "../../src/uploads"));
  Screenshot.findOne({ _id: screenshotId }, (err, screenshot) => {
    if (uploadsFile.includes(screenshot.image)) {
      fs.unlinkSync(
        path.join(__dirname, "../../src/uploads/", screenshot.image)
      );
    }
  });
  const screenshotDeleted = await Screenshot.deleteOne({ _id: screenshotId });

  return screenshotDeleted;
};

//Service de la route PUT /api/screenshots
exports.updateWithFile = async (screenshotId, screenshot) => {
  Screenshot.findOne({ _id: screenshotId }, (err, screenshot) => {
    fs.unlinkSync(path.join(__dirname, "../src/uploads/", screenshot.image));
  });

  const screenshotUpdated = await Screenshot.updateOne(
    { _id: screenshotId },
    screenshot
  );
  return screenshotUpdated;
};

exports.update = async (screenshotId, screenshot) => {
  const screenshotUpdated = await Screenshot.updateOne(
    { _id: screenshotId },
    screenshot
  );
  return screenshotUpdated;
};
