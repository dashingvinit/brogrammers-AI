const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String },
  images: { type: String, required: true },
  foundDate: { type: Date },
  foundLocation: { type: String },
  finder_details: {
    name: { type: String },
    uid: { type: String },
    contact: { type: Number },
  },
  owner_details: {
    name: { type: String },
    uid: { type: String },
    contact: { type: Number },
    UID_image: { type: String },
  },
  flag: {
    type: String,
    enum: ['lost', 'found', 'claimed'],
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
