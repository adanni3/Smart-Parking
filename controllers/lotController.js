const logger = require("../utils/logger");
const lotController = require("../services/lotServices");

const lotpost = async (req, res, next) => {
  const { lotName, occupied } = req.body;
  const imageUrl = req.file.path;
  const occupiedValue = occupied === "true" ? true : occupied === "false" ? false : occupation;
 console.log(occupiedValue);
  try {
    const lot = await lotController.createLot({
      lotName,
      occupied: occupiedValue,
      imageUrl,
    });

    logger.info(`Lot ${lotName} saved by user `);
    return res.status(201).json({
      status: "success",
      message: "Lot successfully saved",
      data: lot,
    });
  } catch (err) {
    logger.error("lot/Post:", err);
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
  
module.exports = {
    lotpost,
    lotget,
    lotHistory,
  };