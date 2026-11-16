import express from 'express';
import {
  getTechniques,
  getTechniqueDetail,
  addTechnique,
  editTechnique,
  removeTechnique
} from '../controllers/techniqueController.js';

const router = express.Router();

router.get('/', getTechniques);
router.get('/:id', getTechniqueDetail);
router.post('/', addTechnique);
router.put('/:id', editTechnique);
router.delete('/:id', removeTechnique);

export default router;
