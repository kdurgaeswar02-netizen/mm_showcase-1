
const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

exports.list = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.get = async (req, res) => {
  const p = await Project.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};

exports.create = async (req, res) => {
  try {
    const projectData = { ...req.body };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'mm_showcase' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      projectData.images = [result.secure_url];
    }

    const doc = new Project(projectData);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const dataToUpdate = { ...req.body };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'mm_showcase' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      dataToUpdate.images = [result.secure_url];
    }

    const doc = await Project.findByIdAndUpdate(req.params.id, dataToUpdate, { new: true });
    if (!doc) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
