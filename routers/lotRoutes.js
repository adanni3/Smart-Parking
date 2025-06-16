const express = require("express");
const validate = require("../utils/validate");
const schema = require("../schemas/validationSchema");
const lotController = require("../controllers/lotController");
const lotrouter = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage}); // Temp storage
const middleware = require("../utils/middleware");

lotrouter.post(
  "/",
   upload.single("image"),
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