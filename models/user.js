const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
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
    default: () => nanoid(10),
  },
  cart: {
    type: Array,
    default: [],
  },
  mobile: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("User", userSchema);
