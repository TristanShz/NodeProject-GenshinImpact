const express = require("express");
const router = express.Router();

const screenshotCtrl = require("../controller/screenshots");
const upload = require("../middlewares/uploadFile");

//route GET /api/screenshots
router.get("/", screenshotCtrl.getScreenshots);

//route POST /api/screenshots
router.post("/", upload.single("image"), screenshotCtrl.addScreenshot);

//route DELETE /api/screenshots
router.delete("/:id", screenshotCtrl.deleteScreenshot);

//route UPDATE /api/screenshots
router.put("/:id", upload.single("image"), screenshotCtrl.updateScreenshot);

module.exports = router;
