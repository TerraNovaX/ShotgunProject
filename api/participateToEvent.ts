// lib/participateToEvent.ts
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

export async function participateToEvent(eventId: string, eventTitle?: string) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Utilisateur non connecté.");
    }

    const { error: insertError } = await supabase
      .from("event_participants")
      .insert({
        user_id: user.id,
        event_id: eventId,
      });

    if (insertError) {
      if (insertError.code === "23505") {
        Alert.alert("Déjà inscrit", "Tu participes déjà à cet événement !");
        return;
      }
      throw insertError;
    }

    Alert.alert("Participation enregistrée", `Tu participes à "${eventTitle}" !`);
  } catch (error: any) {
    console.error("Erreur participation:", error);
    Alert.alert("Erreur", "Impossible d'enregistrer ta participation.");
  }
}
