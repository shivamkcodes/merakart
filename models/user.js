const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    trim: true,
    default: Date.now(),
    required: true,
  },
  cart: {
    type: Array,
    default: [],
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("User", userSchema);
