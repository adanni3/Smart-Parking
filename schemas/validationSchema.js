const Joi = require("joi");

const parkingSchema = Joi.object({
  lotName: Joi.string().valid("lotA", "lotB").required(),
  occupied: Joi.boolean().truthy('true')
  .truthy(true)
  .falsy('false')
  .falsy(false).required()
  });

  const lotHistorySchema = Joi.object({
    lotName: Joi.string().trim().required()
  });
  module.exports = {
    parkingSchema,
    lotHistorySchema
  }