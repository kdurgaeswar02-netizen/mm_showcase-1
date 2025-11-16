const Slider = require('../models/Slider');

exports.list = async (req, res) => {
  const sliders = await Slider.find().sort({ createdAt: -1 });
  res.json(sliders);
};

exports.get = async (req, res) => {
  const slider = await Slider.findById(req.params.id);
  if (!slider) return res.status(404).json({ message: 'Not found' });
  res.json(slider);
};

exports.create = async (req, res) => {
  const doc = new Slider(req.body);
  await doc.save();
  res.json(doc);
};

exports.update = async (req, res) => {
  const doc = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
};

exports.remove = async (req, res) => {
  await Slider.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
