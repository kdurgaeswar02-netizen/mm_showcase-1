const Admin = require('../models/Admin');

module.exports = async function seedAdmin() {
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'password';
    if (!username || !password) return;
    let admin = await Admin.findOne({ username });
    if (!admin) {
      admin = new Admin({ username, password });
      await admin.save();
      console.log('Admin seeded:', username);
    } else {
        await Admin.updateOne({ username }, { $set: { password } });
        console.log('Admin password updated for:', username);
    }
  } catch (err) {
    console.error('seed admin err', err);
  }
};
