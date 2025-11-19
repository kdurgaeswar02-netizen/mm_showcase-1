
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = "mongodb+srv://kdurgaeswar02_db_user:dVZbjjl7ktdAWFya@cluster0.cely7g1.mongodb.net/mm_showcase?retryWrites=true&w=majority";
const ADMIN_EMAIL = "admin@example.com";
const NEW_PASSWORD = "password";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

const resetPassword = async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'mm_showcase' });
    console.log('MongoDB connected');

    const admin = await Admin.findOne({ email: ADMIN_EMAIL });
    if (!admin) {
        console.log('Admin not found, creating a new one.');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(NEW_PASSWORD, salt);
        const newAdmin = new Admin({
            email: ADMIN_EMAIL,
            passwordHash: hashedPassword,
        });
        await newAdmin.save();
        console.log('Admin created and password set successfully.');
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(NEW_PASSWORD, salt);
        admin.passwordHash = hashedPassword;
        await admin.save();
        console.log('Admin password reset successful');
    }
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
  }
};

resetPassword();
