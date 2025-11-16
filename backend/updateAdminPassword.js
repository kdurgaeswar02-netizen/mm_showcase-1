
require('dotenv').config({ path: 'backend/.env' });
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const updateAdminPassword = async () => {
  try {
    await connectDB();
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log('ADMIN_EMAIL or ADMIN_PASSWORD not found in .env file');
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await User.updateOne({ email }, { $set: { passwordHash } });

    if (result.nModified > 0) {
      console.log(`Admin user with email ${email} updated successfully.`);
    } else if (result.n > 0) {
      console.log(`Admin user with email ${email} already has the latest password.`);
    } else {
      console.log(`Admin user with email ${email} not found.`);
    }

  } catch (error) {
    console.error('Error updating admin user:', error);
  } finally {
    process.exit();
  }
};

updateAdminPassword();
