const express = require("express");
const validate = require("../utils/validate");
const schema = require("../schemas/validationSchema");
const lotController = require("../controllers/lotController");
const lotrouter = express.Router();
const middleware = require("../utils/middleware");
const upload = require("../utils/cloudinary");

lotrouter.post(
  "/",
  upload.single("imageUrl"),
  validate(schema.parkingSchema, "body"), 
  lotController.lotpost
);

lotrouter.get(
    "/",
    lotController.lotget
  );
  
lotrouter.get(
    "/:lotName",
    validate(schema.lotHistorySchema, "body"),
    lotController.lotHistory
  );

module.exports = lotrouter;