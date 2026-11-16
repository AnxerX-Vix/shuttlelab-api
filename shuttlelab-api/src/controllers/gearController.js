import {
  findAllGears,
  findGearById,
  insertGear,
  updateGearById,
  deleteGearById
} from '../models/gearModel.js';

export const getGears = async (req, res) => {
  try {
    const { category, search } = req.query;
    const gears = await findAllGears({ category, search });
    res.status(200).json(gears);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGearDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const gear = await findGearById(id);
    if (!gear) {
      return res.status(404).json({ message: 'Gear tidak ditemukan' });
    }
    res.status(200).json(gear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addGear = async (req, res) => {
  try {
    const { name, brand } = req.body;
    if (!name || !brand) {
      return res.status(400).json({ message: 'Nama dan brand gear wajib diisi' });
    }

    const newGear = await insertGear(req.body);
    res.status(201).json({ message: 'Gear berhasil ditambahkan', data: newGear });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editGear = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGear = await updateGearById(id, req.body);
    res.status(200).json({ message: 'Gear berhasil diperbarui', data: updatedGear });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeGear = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteGearById(id);
    res.status(200).json({ message: 'Gear berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
