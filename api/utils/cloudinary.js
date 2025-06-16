const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const config = require("./config");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});

// Configure CloudinaryStorage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "smart-parking", // 
//     format: async (req, file) => "jpeg", // or use file.mimetype.split("/")[1] for dynamic format
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const lotName = req.body.lotName || "unknown_lot";
//       return `${lotName}_${timestamp}`; // ✅ Ensures uniqueness
//     },
//   },
// });

// After result is "changed"
// const cloudResult = await cloudinary.v2.uploader.upload(croppedPath, {
//   folder: 'smart-parking',
//   public_id: `${lotName}-${Date.now()}`
// });

const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};


module.exports = {
  cloudinary,
  uploadFromBuffer
};
