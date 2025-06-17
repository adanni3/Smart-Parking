const sharp     = require('sharp');        // still used for cropping / resizing
const logger    = require('../utils/logger');


function getHighestConfidenceClassification(resultsArray) {
  if (!resultsArray || resultsArray.length === 0) {
    return null; // Or throw an error, depending on desired behavior for empty input
  }

  return resultsArray.reduce((prev, current) => {
    return (prev.confidence > current.confidence) ? prev : current;
  });
}

/* LOAD THE WASM MODELS ONCE AT START-UP*/


async function classifyImage (fullImagePath, lotName) {
 try {
  const edgeImpulseModel = {
    lotA: require('../wasm-models/LotA-model/run-impulse'),
    lotB: require('../wasm-models/LotB-model/run-impulse'),
    /* add more lots here … */
  };
   
const { convertToHexArray} = edgeImpulseModel[lotName];
 let label = await convertToHexArray(fullImagePath);
 let status = getHighestConfidenceClassification(label.results)
 status = label.label;
  return status
} catch (err) {
  console.error('Failed to load models/ classify image', err);
}
}


module.exports = {
    classifyImage
  };