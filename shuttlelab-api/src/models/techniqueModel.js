import { supabase } from '../config/supabaseClient.js';

export const findAllTechniques = async ({ difficulty, category } = {}) => {
  let query = supabase
    .from('techniques')
    .select('*')
    .order('id', { ascending: true });

  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }

  if (category) {
    query = query.ilike('category', `%${category}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const findTechniqueById = async (id) => {
  const { data, error } = await supabase
    .from('techniques')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const insertTechnique = async (techniqueData) => {
  const { data, error } = await supabase
    .from('techniques')
    .insert([techniqueData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateTechniqueById = async (id, techniqueData) => {
  const { data, error } = await supabase
    .from('techniques')
    .update(techniqueData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTechniqueById = async (id) => {
  const { data, error } = await supabase
    .from('techniques')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
};
