import express from 'express';
import {
  getGears,
  getGearDetail,
  addGear,
  editGear,
  removeGear
} from '../controllers/gearController.js';

const router = express.Router();

router.get('/', getGears);
router.get('/:id', getGearDetail);
router.post('/', addGear);
router.put('/:id', editGear);
router.delete('/:id', removeGear);

export default router;
