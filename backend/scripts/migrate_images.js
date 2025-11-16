
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const connectDB = require('../config/db');

const migrateImages = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected.');

    console.log('Finding projects with string images...');
    const projectsToMigrate = await Project.find({ images: { $type: 'string' } });

    if (projectsToMigrate.length === 0) {
      console.log('No projects to migrate. All image fields are already arrays.');
      return;
    }

    console.log(`Found ${projectsToMigrate.length} projects to migrate.`);

    for (const project of projectsToMigrate) {
      console.log(`Migrating project: ${project.title}`);
      const imageUrl = project.images;
      project.images = [imageUrl];
      await project.save();
      console.log(`Project ${project.title} migrated successfully.`);
    }

    console.log('Image migration completed successfully.');
  } catch (error) {
    console.error('Error migrating images:', error);
  } finally {
    mongoose.disconnect();
    console.log('Database connection closed.');
  }
};

migrateImages();
