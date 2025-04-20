import { supabase } from '../lib/supabase'; 
import { Event } from '../type/event';

export async function fetchAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*');

  if (error) {
    console.error("Erreur Supabase :", error.message);
    return [];
  }

  return data as Event[];
}