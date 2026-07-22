import 'dotenv/config';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import connectDB from '../config/db.js';

const updateDbProjects = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('Fetching projects from database...');
    const projects = await Project.find({});
    console.log(`Found ${projects.length} projects in database.`);

    if (projects.length > 0) {
      console.log('Updating all projects to set featured = true...');
      const result = await Project.updateMany({}, { $set: { featured: true } });
      console.log(`Successfully updated ${result.modifiedCount} projects in the database.`);
    } else {
      console.log('No projects found in database to update.');
    }

    // Disconnect
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating database:', error);
    process.exit(1);
  }
};

updateDbProjects();
