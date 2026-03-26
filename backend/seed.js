import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Project from "./models/Project.js";
import Skill from "./models/Skill.js";
import dns from 'dns'

 dns.setServers(['1.1.1.1']);
const projects = [
  {
  title: 'Varun Furnitures',
  description: 'A modern furniture store website where users can browse furniture products, view details, and place orders online with a responsive UI.',
  image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=350&fit=crop',
  technologies: ['React', 'Node.js', 'Express.js','Bootstrap', 'MongoDB'],
  githubLink: 'https://github.com/Rathivarman-hub/varun_furnitures',
  liveLink: 'https://varun-furnitures.vercel.app/',
  category: 'Full Stack',
  featured: true,
},
  {
  title: 'Student Information System',
  description: 'A full-stack MERN application for managing student records, creating student records, Admin must be Edit or Delete student records.',
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=350&fit=crop',
  technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Bootstrap'],
  githubLink: 'https://github.com/Rathivarman-hub/student_info_system',
  liveLink: 'https://student-info-system-eight.vercel.app/',
  category: 'Full Stack',
  featured: true,
},


{
  title: 'Movie Database App',
  description: 'A movie browsing application that allows users to search movies, view ratings, trailers, and details using the TMDB API.',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=350&fit=crop',
  technologies: ['React', 'Bootstrap', 'TMDB API'],
  githubLink: 'https://github.com/Rathivarman-hub/movie-app',
  liveLink: 'https://movie-lzn4xrix8-rathivarman-hubs-projects.vercel.app/',
  category: 'Frontend',
  featured: false,
}
];

const skills = [
  { name: "HTML5", icon: "🌐", category: "Frontend", color: "#e34f26"},
  { name: "CSS3", icon: "🎨", category: "Frontend", color: "#1572b6" },
  { name: "JavaScript", icon: "JS", category: "Frontend", color: "#f7df1e" },
  { name: "React.js", icon: "⚛️", category: "Frontend", color: "#61dafb"},
  { name: "Bootstrap", icon: "🅱️", category: "Frontend", color: "#7952b3" },
  { name: "Node.js", icon: "🟢", category: "Backend", color: "#339933" },
  { name: "Express.js", icon: "🇪🇽", category: "Backend", color: "#6366f1"},
  { name: "MongoDB", icon: "🍃", category: "Database", color: "#47a248"},
  { name: "Git", icon: "🔧", category: "Tools", color: "#f05032"},
];

const seedDB = async () => {
  try {
    await connectDB();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();
