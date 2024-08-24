const express = require("express");
const router = express.Router();
const descriptionController = require("../controllers/descriptionController.js");




router.post("/getTravelDescription", descriptionController.getDescription);

module.exports = router;