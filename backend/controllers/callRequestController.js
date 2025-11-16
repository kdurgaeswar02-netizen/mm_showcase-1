const CallRequest = require('../models/CallRequest');

// @desc    Create a new call request
// @route   POST /api/call-requests
// @access  Public
exports.createCallRequest = async (req, res) => {
  try {
    const callRequest = await CallRequest.create(req.body);
    res.status(201).json({ success: true, data: callRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
