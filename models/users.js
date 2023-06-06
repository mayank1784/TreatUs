const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    // username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['seller', 'buyer'], required: true },
    // other relevant fields
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;