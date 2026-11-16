import {
  findAllTechniques,
  findTechniqueById,
  insertTechnique,
  updateTechniqueById,
  deleteTechniqueById
} from '../models/techniqueModel.js';

export const getTechniques = async (req, res) => {
  try {
    const { difficulty, category } = req.query;
    const techniques = await findAllTechniques({ difficulty, category });
    res.status(200).json(techniques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTechniqueDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const technique = await findTechniqueById(id);
    if (!technique) {
      return res.status(404).json({ message: 'Teknik tidak ditemukan' });
    }
    res.status(200).json(technique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTechnique = async (req, res) => {
  try {
    const { name, category, difficulty } = req.body;
    if (!name || !category || !difficulty) {
      return res.status(400).json({ message: 'Nama, kategori, dan tingkat kesulitan teknik wajib diisi' });
    }

    const newTechnique = await insertTechnique(req.body);
    res.status(201).json({ message: 'Teknik berhasil ditambahkan', data: newTechnique });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editTechnique = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTechnique = await updateTechniqueById(id, req.body);
    res.status(200).json({ message: 'Teknik berhasil diperbarui', data: updatedTechnique });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeTechnique = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTechniqueById(id);
    res.status(200).json({ message: 'Teknik berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
