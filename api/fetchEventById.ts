
import { supabase } from '../lib/supabase';
import { Event } from '../type/event';

export async function fetchEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events') 
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
    return null;
  }

  return data;
}
