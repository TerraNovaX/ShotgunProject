
import { supabase } from "../lib/supabase";
import { Event } from "../type/event";

type ParticipantWithEvent = {
  events: Event | null;
};

export async function fetchMyEvents(userId: string): Promise<Event[]> {
  const { data, error } = await supabase
    .from("event_participants")
    .select("events(*)")
    .eq("user_id", userId) as unknown as { data: ParticipantWithEvent[]; error: any };

  if (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    return [];
  }

  const events: Event[] = data
    .map((item) => item.events)
    .filter((e): e is Event => e !== null);

  return events;
}
