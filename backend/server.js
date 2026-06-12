import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [ 
    'http://localhost:5173', 
    'https://portfolio-rho-one-dzfmo3p7cf.vercel.app',
    'https://student-info-system-eight.vercel.app',
    'https://varun-furnitures.vercel.app',
    'https://rathivarman-portfolio.vercel.app',
    "https://evcharging-one.vercel.app/",
    "https://stockzen-ims.vercel.app/",
    'http://13.48.44.151:5173/'
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (moved up)
app.get('/', (req, res) => {
  res.json({ success: true, message: '🚀 Portfolio API is running...' });
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
