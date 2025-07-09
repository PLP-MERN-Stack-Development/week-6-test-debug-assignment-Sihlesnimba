import Bug from '../models/Bug.js';

// createBug with DI
export const createBug = (BugModel = Bug) => async (req, res) => {
  const { title, description } = req.body;
  try {
    const bug = await BugModel.create({ title, description });
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const createBugHandler = createBug(); // default export for routes

// Other controllers (no DI needed, export as-is)
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBug = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const bug = await Bug.findByIdAndUpdate(id, { status }, { new: true });
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBug = async (req, res) => {
  const { id } = req.params;
  try {
    const bug = await Bug.findByIdAndDelete(id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
