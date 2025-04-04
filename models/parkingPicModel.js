const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
//More input needed like name and all
  lotName: { type: String, required: true },
  occupied: { type: Boolean, required: true},
  imageUrl: { type: String, required: true },  
  timestamp: {
    type: Date,
    default: Date.now,
  }
  });

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

ParkingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Parking", ParkingSchema);
