const express = require("express");
const bodyParser = require("body-parser");
const config = require("./utils/config");
const logger = require("./utils/logger");
const lotRoutes = require("./routers/lotRoutes.js");

const cors = require("cors");
const middleware = require("./utils/middleware");
const app = express();
const mongoose = require('mongoose');

//DATABASES
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI, {})
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error:", err));

app.use(cors());  
app.use(express.json());
app.use(bodyParser.json());

// Use routes
app.use("/api/lot", lotRoutes);

module.exports = app;