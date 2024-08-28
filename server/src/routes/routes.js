const express = require("express");
const router = express.Router();
const descriptionController = require("../controllers/travelController.js");
const imageController = require("../controllers/imageController.js");




router.post("/getTravel", descriptionController.getTravel);
router.post("/getImage", imageController.getImage);

module.exports = router;