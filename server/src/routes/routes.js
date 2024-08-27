const express = require("express");
const router = express.Router();
const descriptionController = require("../controllers/travelController.js");




router.post("/getTravel", descriptionController.getTravel);

module.exports = router;