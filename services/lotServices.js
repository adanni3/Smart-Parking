const Lot = require("../models/parkingPicModel");
const logger = require("../utils/logger");

const createLot = async (lotData) => {
    try {
      const lot = new Lot(lotData);
      await lot.save();
      logger.info(`Lot ${lot._id} successfully created`);
      return lot;
    } catch (err) {
      logger.error(err);
      const error = new Error("Internal Server Error");
      error.status = 500;
      throw error;
    }
  };
  
  const getLotHistory = async (lotName) => {
    return await Lot.find({ lotName }).sort({ timestamp: -1 });
  };

  const getLatestLots = async () => {
    const lots = await Lot.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$lotName",
          latestLot: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$latestLot" }
      }
    ]);
    return lots;
  };


  module.exports = {
    getLotHistory,
    createLot,
    getLatestLots
  }