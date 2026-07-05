import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const defaultProjects = [
   {
   title: 'VendorBridge - Procurement ERP System',
   description: 'A full-stack Procurement ERP platform that enables companies to manage vendors, create RFQs, collect and compare vendor quotations, track Purchase Orders and Invoices, and streamline procurement workflows. Features 4-role RBAC, JWT authentication, real-time notifications with Socket.io, Gmail OAuth2 email integration, Cloudinary file uploads, analytics dashboard, and secure end-to-end procurement management.',
   image: '',
   technologies: ['React 18','Node.js','Express.js','MongoDB','Socket.io','JWT','Cloudinary','Gmail OAuth2','RBAC'
   ],
   githubLink: 'https://github.com/Rathivarman-hub/vendor-bridge',
   liveLink: 'https://vendor-bridge-erp-system.vercel.app/',
   category: 'Full Stack',
   featured: true
 },
    {
   title: 'Booking Platform',
   description: 'A responsive MERN stack booking platform where users can securely register with OTP verification, book slots, and manage bookings. Includes Role-Based Access Control for Participants, Organisers, and Admins, with secure authentication, booking management, and scalable backend architecture.',
   image: '',
   technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Vite', 'JWT', 'OTP Authentication'],
   githubLink: 'https://github.com/Rathivarman-hub/hackathon-booking',
   liveLink: 'https://appopintment-booking.vercel.app/',
   category: 'Full Stack',
   featured: true,
 },
   {
   title: 'StockZen – Inventory Management System',
   description: 'A full-stack inventory management system built with the MERN stack for efficient product tracking and stock management. Features dynamic dashboards, real-time stock updates, stock in/out management, and automated inventory updates with a modern dark glassmorphism UI.',
   image: '',
   technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Axios', 'Framer Motion'],
   githubLink: 'https://github.com/Rathivarman-hub/stockZen',
   liveLink: 'https://stockzen-ims.vercel.app/',
   category: 'Full Stack',
   featured: true,
 },
];

const defaultSkills = [
  // Frontend
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'Frontend', color: '#e34f26' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'Frontend', color: '#1572b6' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Frontend', color: '#f7df1e' },
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend', color: '#61dafb' },
  { name: 'Vite', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg', category: 'Frontend', color: '#646CFF' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', category: 'Frontend', color: '#7952b3' },
  // Backend
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend', color: '#339933' },
  { name: 'Express.js', icon: 'https://api.iconify.design/simple-icons:express.svg?color=%23ffffff', category: 'Backend', color: '#6366f1', adaptive: true },
  { name: 'RestAPI', icon: 'https://img.icons8.com/color/48/api-settings.png', category: 'Backend', color: '#007ACC' },
  { name: 'Socket.io', icon: 'https://api.iconify.design/simple-icons:socketdotio.svg?color=%23ffffff', category: 'Backend', color: '#ffffff', adaptive: true },
  // Database
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database', color: '#47a248' },
  { name: 'Mongoose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg', category: 'Database', color: '#880000' },
  // Security
  { name: 'JWT', icon: 'https://api.iconify.design/simple-icons:jsonwebtokens.svg?color=%23d63aff', category: 'Security', color: '#d63aff' },
  { name: 'Authentication', icon: 'https://img.icons8.com/color/48/password.png', category: 'Security', color: '#FFD700' },
  { name: 'RBAC', icon: 'https://img.icons8.com/color/48/security-checked--v1.png', category: 'Security', color: '#4CAF50' },
  // Tools
  { name: 'MongoDB Compass', icon: 'https://img.icons8.com/color/48/mongodb.png', category: 'Tools', color: '#47a248' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Tools', color: '#f05032' },
  { name: 'GitHub', icon: 'https://api.iconify.design/mdi:github.svg?color=%23ffffff', category: 'Tools', color: '#e0e0e0', adaptive: true },
  { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', category: 'Tools', color: '#2088FF' },
  { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'Tools', color: '#007ACC' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', category: 'Tools', color: '#FF6C37' },
  { name: 'Amazon EC2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'Tools', color: '#FF9900' },
  { name: 'Vercel', icon: 'https://api.iconify.design/simple-icons:vercel.svg?color=%23ffffff', category: 'Tools', color: '#d0d0d0', adaptive: true },
  { name: 'Render', icon: 'https://api.iconify.design/simple-icons:render.svg?color=%234351E8', category: 'Tools', color: '#4351E8' },
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
