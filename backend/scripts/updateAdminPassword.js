require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const MONGODB_URI = process.env.MONGODB_URI;

const updateAdminPassword = async (email, newPassword) => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const result = await Admin.updateOne({ email }, { $set: { password: hashedPassword } });

    if (result.nModified === 0) {
      console.log(`No admin found with email: ${email}`);
    } else {
      console.log(`Password updated successfully for admin: ${email}`);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating admin password:', error);
    mongoose.connection.close();
  }
};

const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.log('Usage: node updateAdminPassword.js <email> <newPassword>');
} else {
  updateAdminPassword(email, newPassword);
}
