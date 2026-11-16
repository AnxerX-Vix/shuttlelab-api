import express from 'express';
import { getCategories, getCategoryDetail } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryDetail);

export default router;
