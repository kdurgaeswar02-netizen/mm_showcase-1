const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

module.exports = async function seedAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const pass = process.env.ADMIN_PASSWORD;
    if (!email || !pass) return;
    let admin = await Admin.findOne({ email });
    const hash = await bcrypt.hash(pass, 10);
    if (!admin) {
      admin = new Admin({ email, passwordHash: hash });
      await admin.save();
      console.log('Admin seeded:', email);
    } else {
        await Admin.updateOne({ email }, { $set: { passwordHash: hash } });
        console.log('Admin password updated for:', email);
    }
  } catch (err) {
    console.error('seed admin err', err);
  }
};
