const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  state: { type: String, required: true },
  sellerPhone: {type: String, required: true},
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);