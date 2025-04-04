const logger = require("../utils/logger");
const config = require("../utils/config");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  // logger.error(error.name);
  if (error.name === "CastError") {
    return response.status(400).json({
      status: "error",
      message: "improper arguments passed through",
    });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      status: "error",
      message: error.message,
    });
  } else if (error.name === "SyntaxError") {
    return response.status(400).json({
      status: "error",
      message: "Syntax Error",
    });
  } else if (error.name === "ReferenceError") {
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  } else if (error.status == 400) {
    return response.status(400).json({
      status: "error",
      message: error.message,
    });
  } else if (error.status == 404) {
    return response.status(500).json({
      status: "error",
      message: error.message,
    });
  } else if (error.status == 500) {
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
  next(error);
};

const unknownEndpoint = (err, req, res, next) => {
  return res.status(404).json({
    status: "error",
    message: "Unknown endpoint",
  });
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};
