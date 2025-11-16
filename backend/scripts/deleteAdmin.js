
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

const deleteAdmin = async () => {
  try {
    await connectDB();
    const email = process.env.ADMIN_EMAIL;
    if (!email) {
      console.log('ADMIN_EMAIL not found in .env file');
      return;
    }
    const result = await User.deleteOne({ email });
    if (result.deletedCount > 0) {
      console.log(`Admin user with email ${email} deleted successfully.`);
    } else {
      console.log(`Admin user with email ${email} not found.`);
    }
  } catch (error) {
    console.error('Error deleting admin user:', error);
  } finally {
    process.exit();
  }
};

deleteAdmin();
