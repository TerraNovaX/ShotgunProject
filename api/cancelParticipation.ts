import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

export async function cancelParticipation(eventId: string, eventTitle: string, setEvents: React.Dispatch<React.SetStateAction<any[]>>) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Utilisateur non connecté.");
    }

    const { error: deleteError } = await supabase
      .from("event_participants")
      .delete()
      .match({ user_id: user.id, event_id: eventId });

    if (deleteError) {
      throw deleteError;
    }

    Alert.alert("Participation annulée", `Tu n'es plus inscrit à "${eventTitle}".`);

    // Mettre à jour l'état des événements après suppression
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  } catch (error: any) {
    console.error("Erreur annulation:", error);
    Alert.alert("Erreur", "Impossible d'annuler ta participation.");
  }
}
