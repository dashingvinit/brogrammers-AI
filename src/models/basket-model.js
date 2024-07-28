const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  complexity: { type: String, required: true },
  et: { type: String, required: true },
  code: { type: String, required: true },
  preReq: { type: [String], required: true },
});

const ProjectBasketSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  projects: [ProjectSchema],
});

const ProjectBasket = mongoose.model('ProjectBasket', ProjectBasketSchema);

module.exports = ProjectBasket;
