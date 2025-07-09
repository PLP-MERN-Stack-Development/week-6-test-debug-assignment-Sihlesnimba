import express from 'express';
import { createBugHandler, getBugs, updateBug, deleteBug } from '../controllers/bugController.js';

const router = express.Router();

router.post('/', createBugHandler);
router.get('/', getBugs);
router.patch('/:id', updateBug);
router.delete('/:id', deleteBug);

export default router;
