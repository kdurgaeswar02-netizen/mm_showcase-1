const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  category: String,
  location: String,
  price: String
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
