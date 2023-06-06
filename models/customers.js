const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    latitude: { type: String},
    longitude: { type: String},
  });
  
  const Customer = mongoose.model('Customer', customerSchema);
  module.exports = Customer;