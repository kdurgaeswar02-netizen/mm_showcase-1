
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
require('dotenv').config();

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'mm_showcase' });
    console.log('MongoDB connected');

    const admin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!admin) {
      console.log('Admin not found');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('new_password', salt);

    admin.passwordHash = hashedPassword;
    await admin.save();
    console.log('Admin password reset successful');
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

resetPassword();
