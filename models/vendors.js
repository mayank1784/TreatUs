const mongoose = require("mongoose");

const streetVendorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    stallName: {type: String, required: true},
    latitude: { type: String},
    longitude: { type: String},
    menu: [{
      name: { type: String,},
      description: { type: String },
      price: { type: Number },
      image: { type: String }, // or you can use Binary type for storing binary data
    }],
  });
//   streetVendorSchema.methods.updateLocation = function (newLocation) {
//     // Update the location logic
//   };
  
//   // Method to update the menu
//   streetVendorSchema.methods.updateMenu = function (newMenu) {
//     // Update the menu logic
//   };
  const StreetVendor = mongoose.model('StreetVendor', streetVendorSchema);
  module.exports = StreetVendor;