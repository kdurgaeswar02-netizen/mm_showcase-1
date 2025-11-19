const CallRequest = require('../models/CallRequest');
const nodemailer = require('nodemailer');

// @desc    Create a new call request
// @route   POST /api/call-requests
// @access  Public
exports.createCallRequest = async (req, res) => {
  try {
    const callRequest = await CallRequest.create(req.body);

    // Send email notification
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'maddison53@ethereal.email',
            pass: 'jn7jnAPss4f63QBp6D'
        }
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'kdurgaeswar02@gmail.com',
      subject: 'New Call Request',
      text: `You have a new call request from:\n\nName: ${req.body.name}\nPhone: ${req.body.phone}\nService: ${req.body.service}\nMessage: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ success: true, data: callRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
