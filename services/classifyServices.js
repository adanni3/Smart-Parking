const sharp     = require('sharp');        // still used for cropping / resizing
const logger    = require('../utils/logger');

/* LOAD THE WASM MODELS ONCE AT START-UP*/
const edgeImpulseModel = {
  lotA: require('../wasm-models/lotA-model/run-impulse'),
  lotB: require('../wasm-models/lotB-model/run-impulse'),
  /* add more lots here … */
};

async function classifyImage (fullImagePath, lotName) {
  
const { convertToHexArray} = edgeImpulseModel[lotName];
 let label = await convertToHexArray(fullImagePath);
 label = label.results[0].label;
  return label
}


module.exports = {
    classifyImage
  };