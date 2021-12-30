const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
    maxlength: 15,
    unique: true,
  },
  price: {
    required: true,
    type: Number,
    trim: true,
  },
  quantity: {
    required: true,
    type: Number,
    trim: true,
  },
  desc: {
    required: true,
    type: String,
    trim: true,
  },
  image: {
    required: true,
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
