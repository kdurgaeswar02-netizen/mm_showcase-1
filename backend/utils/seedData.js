const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const Project = require('../models/Project');
const FAQ = require('../models/FAQ');
const Review = require('../models/Review');
const connectDB = require('../config/db');

const projects = [
  { name: 'E-commerce Platform', description: 'A full-featured e-commerce platform with a modern UI.', imageUrl: 'https://via.placeholder.com/300' },
  { name: 'Portfolio Website', description: 'A personal portfolio website to showcase my work.', imageUrl: 'https://via.placeholder.com/300' }
];

const faqs = [
  { question: 'What is your refund policy?', answer: 'We offer a 30-day money-back guarantee.' },
  { question: 'How do I contact support?', answer: 'You can contact us via email at support@example.com.' }
];

const reviews = [
  { author: 'John Doe', comment: 'Excellent service and a great product!' },
  { author: 'Jane Smith', comment: 'I am very happy with my purchase.' }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Project.insertMany(projects);
    await FAQ.deleteMany({});
    await FAQ.insertMany(faqs);
    await Review.deleteMany({});
    await Review.insertMany(reviews);
    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
