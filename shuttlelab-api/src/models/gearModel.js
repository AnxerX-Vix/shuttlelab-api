import { supabase } from '../config/supabaseClient.js';

export const findAllGears = async ({ category, search } = {}) => {
  let query = supabase
    .from('gears')
    .select('*, categories(id, name, slug)')
    .order('id', { ascending: true });

  if (category) {
    if (!isNaN(category)) {
      query = query.eq('category_id', Number(category));
    } else {
      query = supabase
        .from('gears')
        .select('*, categories!inner(id, name, slug)')
        .eq('categories.slug', category)
        .order('id', { ascending: true });
    }
  }

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const findGearById = async (id) => {
  const { data, error } = await supabase
    .from('gears')
    .select('*, categories(id, name, slug)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const insertGear = async (gearData) => {
  const { data, error } = await supabase
    .from('gears')
    .insert([gearData])
    .select('*, categories(id, name, slug)')
    .single();

  if (error) throw error;
  return data;
};

export const updateGearById = async (id, gearData) => {
  const { data, error } = await supabase
    .from('gears')
    .update(gearData)
    .eq('id', id)
    .select('*, categories(id, name, slug)')
    .single();

  if (error) throw error;
  return data;
};

export const deleteGearById = async (id) => {
  const { data, error } = await supabase
    .from('gears')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
};
