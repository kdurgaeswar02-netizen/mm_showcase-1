const express = require('express');
const router = express.Router();
const multer = require('multer');

// CallRequest routes
const { createCallRequest } = require('../controllers/callRequestController');
const CallRequest = require('../models/CallRequest');
const { authMiddleware } = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/calls', createCallRequest);

router.get('/calls', authMiddleware, async (req, res) => {
  const calls = await CallRequest.find().sort({ createdAt: -1 });
  res.json(calls);
});

router.put('/calls/:id', authMiddleware, async (req, res) => {
  const c = await CallRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(c);
});

// FAQ routes
const faqCtrl = require('../controllers/faqController');

router.get('/faqs', faqCtrl.list);
router.post('/faqs', authMiddleware, faqCtrl.create);
router.put('/faqs/:id', authMiddleware, faqCtrl.update);
router.delete('/faqs/:id', authMiddleware, faqCtrl.remove);

// Product routes
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.get('/products/:id', async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

router.post('/products', authMiddleware, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

router.put('/products/:id', authMiddleware, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

router.delete('/products/:id', authMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Project routes
const projectCtrl = require('../controllers/projectController');

router.get('/projects', projectCtrl.list);
router.get('/projects/:id', projectCtrl.get);

// admin protected
router.post('/projects', authMiddleware, upload.single('image'), projectCtrl.create);
router.put('/projects/:id', authMiddleware, upload.single('image'), projectCtrl.update);
router.delete('/projects/:id', authMiddleware, projectCtrl.remove);

// Review routes
const reviewCtrl = require('../controllers/reviewController');

router.get('/reviews', reviewCtrl.list);
router.post('/reviews', reviewCtrl.create); // public reviews allowed
router.delete('/reviews/:id', authMiddleware, reviewCtrl.remove);

// Slider routes
const sliderCtrl = require('../controllers/sliderController');

router.get('/slider', sliderCtrl.list);
router.get('/slider/:id', sliderCtrl.get);

// admin protected
router.post('/slider', authMiddleware, sliderCtrl.create);
router.put('/slider/:id', authMiddleware, sliderCtrl.update);
router.delete('/slider/:id', authMiddleware, sliderCtrl.remove);

// Setting routes
const Setting = require('../models/Setting');

// get all settings
router.get('/settings', async (req, res) => {
  const settings = await Setting.find();
  const out = {};
  settings.forEach(s => (out[s.key] = s.value));
  res.json(out);
});

// set/update single setting
router.post('/settings', authMiddleware, async (req, res) => {
  const { key, value } = req.body;
  const s = await Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
  res.json(s);
});

module.exports = router;
