import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    githubLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
    technologies: [{ type: String }],
    category: { type: String, default: 'Web' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
