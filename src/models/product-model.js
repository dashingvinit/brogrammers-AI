const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String },
  images: [{ type: String, required: true }],
  foundDate: { type: Date },
  foundLocation: { type: String },
  uploader_details: {
    name: { type: String, required: true },
    uid: { type: String, required: true },
    contact: { type: Number, required: true },
  },
  claimer_details: {
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
