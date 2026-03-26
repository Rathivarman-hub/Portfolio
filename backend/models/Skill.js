import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    percentage: { type: Number, min: 0, max: 100, default: 0 },
    icon: { type: String, default: '' },
    category: { type: String, default: 'Frontend' },
    color: { type: String, default: '#6c63ff' },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
