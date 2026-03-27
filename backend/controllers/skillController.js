import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ percentage: -1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
