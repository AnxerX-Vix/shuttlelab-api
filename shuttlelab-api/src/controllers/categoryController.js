import { findAllCategories, findCategoryById } from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await findAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await findCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
