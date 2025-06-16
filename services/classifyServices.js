const sharp     = require('sharp');        // still used for cropping / resizing
const logger    = require('../utils/logger');


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
 label = label.results[0].label;
  return label
} catch (err) {
  console.error('Failed to load models/ classify image', err);
}
}


module.exports = {
    classifyImage
  };