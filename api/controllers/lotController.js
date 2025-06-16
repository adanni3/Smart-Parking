const fs = require("fs");
const path = require("path");
const axios = require("axios");
const {classifyImage} = require("../services/classifyServices");
const sharp     = require('sharp');    
const logger = require("../utils/logger");
const lotController = require("../services/lotServices");
const {uploadFromBuffer} = require("../utils/cloudinary"); // You should have a helper for Cloudinary



const lotpost = async (req, res, next) => {
  const { lotName } = req.body;
  const originalPath = req.file.buffer;

  try {
        /* Run local WASM classification */
    const label     = await classifyImage(originalPath, lotName);
    const newStatus = label === 'vacant' ? false : true;

    const previous = await lotController.getLastLot(lotName);
    console.log("previous",previous)
    if (!previous || previous.status !== newStatus) {

    const result = await uploadFromBuffer(originalPath);

      const lot = await lotController.createLot({
        lotName,
        status: newStatus,
        timestamp: new Date(),
        imageUrl: result.secure_url,
      });

      logger.info(`Lot ${lotName} updated (new status: ${newStatus})`);
      return res.status(201).json({
        status: "success",
        message: "Lot status updated and saved",
        data: lot,
      });
    } else {
      logger.info(`Lot ${lotName} unchanged; no update saved`);
      return res.status(200).json({
        status: "no_change",
        message: "No state change detected",
      });
    }

  } catch (err) {
    logger.error("lot/Post:",err);
    next(err);
  }
};


  const lotHistory = async (req, res, next) => {
    const { lotName } = req.params;
  
    try {
      const history = await lotController.getLotHistory(lotName);
      if (!history || history.length === 0) {
        return res.status(404).json({
          status: "error",
          message: `No history found for lot: ${lotName}`,
        });
      }
  
      return res.status(200).json({
        status: "success",
        message: `History retrieved for lot: ${lotName}`,
        data: history,
      });
    } catch (err) {
      logger.error("lot/History:", err);
      next(err);
    }
  };

    // Get All lot Entries
  const lotget = async (req, res, next) => {
    try {
      const lots = await lotController.getLatestLots();
      return res.status(200).json({
        status: "success",
        message: "Latest lot statuses retrieved",
        data: lots,
      });
    } catch (err) {
      logger.error("lot/Get:", err);
      next(err);
    }
  };

  
module.exports = {
    lotpost,
    lotget,
    lotHistory,
  };