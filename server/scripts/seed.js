import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';

dotenv.config({ path: '../.env' }); // Make sure path to .env is correct if run from scripts folder

const defaultProjects = [
  {
    title: 'Booking Platform',
    description: 'A responsive MERN stack booking platform where users can securely register with OTP verification, book slots, and manage bookings. Includes Role-Based Access Control for Participants, Organisers, and Admins, with secure authentication, booking management, and scalable backend architecture.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop', // Placeholder since local assets can't easily seed directly
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Vite', 'JWT', 'OTP Authentication'],
    githubLink: 'https://github.com/Rathivarman-hub/hackathon-booking',
    liveLink: 'https://appopintment-booking.vercel.app/',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'EV Charging Station Booking Platform',
    description: 'A full-stack MERN application for discovering and booking EV charging station time slots across Tamil Nadu. Features OTP authentication, profile management with Cloudinary uploads, live slot availability updates with Socket.io, Google Maps integration with custom markers, and an admin dashboard for station management and analytics.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Cloudinary', 'Google Maps API'],
    githubLink: 'https://github.com/Rathivarman-hub/EVcharging',
    liveLink: 'https://evcharging-one.vercel.app/',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'StockZen – Inventory Management System',
    description: 'A full-stack inventory management system built with the MERN stack for efficient product tracking and stock management. Features dynamic dashboards, real-time stock updates, stock in/out management, and automated inventory updates with a modern dark glassmorphism UI.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Axios', 'Framer Motion'],
    githubLink: 'https://github.com/Rathivarman-hub/stockZen',
    liveLink: 'https://stockzen-ims.vercel.app/',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'Varun Furnitures',
    description: 'A modern furniture store website where users can browse furniture products, view details, and place orders online with a responsive UI.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop',
    technologies: ['React', 'Node.js', 'Express.js','Bootstrap', 'MongoDB'],
    githubLink: 'https://github.com/Rathivarman-hub/varun_furnitures',
    liveLink: 'https://varun-furnitures.vercel.app/',
    category: 'Full Stack',
  },
  {
    title: 'Student Information System',
    description: 'A full-stack MERN application for managing student records. Admins can efficiently create, edit, or delete student profiles.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Bootstrap'],
    githubLink: 'https://github.com/Rathivarman-hub/student_info_system',
    liveLink: 'https://student-info-system-eight.vercel.app/',
    category: 'Full Stack',
  },
  {
    title: 'Movie Database App',
    description: 'A movie browsing application that allows users to search movies, view ratings, trailers, and details using the TMDB API. Note: A VPN may be required to access some details due to geo-restrictions.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=350&fit=crop',
    technologies: ['React', 'Bootstrap', 'TMDB API'],
    githubLink: 'https://github.com/Rathivarman-hub/movie-app',
    liveLink: 'https://movie-lzn4xrix8-rathivarman-hubs-projects.vercel.app/',
    category: 'Frontend',
    featured: false,
  }
];

const defaultSkills = [
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'Frontend', color: '#e34f26' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'Frontend', color: '#1572b6' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Frontend', color: '#f7df1e' },
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend', color: '#61dafb' },
  { name: 'Framer Motion', icon: 'https://api.iconify.design/tabler:brand-framer-motion.svg?color=%230055FF', category: 'Frontend', color: '#0055FF' },
  { name: 'Vite', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg', category: 'Frontend', color: '#646CFF' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', category: 'Frontend', color: '#7952b3' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend', color: '#339933' },
  { name: 'Express.js', icon: 'https://api.iconify.design/simple-icons:express.svg?color=%23ffffff', category: 'Backend', color: '#6366f1', adaptive: true },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database', color: '#47a248' },
  { name: 'Mongoose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg', category: 'Database', color: '#880000' },
  { name: 'MongoDB Compass', icon: 'https://img.icons8.com/color/48/mongodb.png', category: 'Database', color: '#47a248' },
  { name: 'RestAPI', icon: 'https://img.icons8.com/color/48/api-settings.png', category: 'Backend', color: '#007ACC' },
  { name: 'Authentication', icon: 'https://img.icons8.com/color/48/password.png', category: 'Security', color: '#FFD700' },
  { name: 'RBAC', icon: 'https://img.icons8.com/color/48/security-checked--v1.png', category: 'Security', color: '#4CAF50' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Tools', color: '#f05032' },
  { name: 'GitHub', icon: 'https://api.iconify.design/mdi:github.svg?color=%23ffffff', category: 'Tools', color: '#e0e0e0', adaptive: true },
  { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', category: 'Tools', color: '#2088FF' },
  { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'Tools', color: '#007ACC' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', category: 'Tools', color: '#FF6C37' },
  { name: 'Amazon EC2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'Tools', color: '#FF9900' },
  { name: 'Vercel', icon: 'https://api.iconify.design/simple-icons:vercel.svg?color=%23ffffff', category: 'Tools', color: '#d0d0d0', adaptive: true },
  { name: 'Render', icon: 'https://api.iconify.design/simple-icons:render.svg?color=%234351E8', category: 'Tools', color: '#4351E8' },
  { name: 'n8n', icon: 'https://img.icons8.com/color/48/workflow.png', category: 'Tools', color: '#FF6D5A' },
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Project.deleteMany();
    await Skill.deleteMany();

    console.log('Seeding projects...');
    await Project.insertMany(defaultProjects);

    console.log('Seeding skills...');
    await Skill.insertMany(defaultSkills);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
