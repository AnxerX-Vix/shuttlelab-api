import { supabase } from '../config/supabaseClient.js';

export const findAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

export const findCategoryById = async (id) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};
