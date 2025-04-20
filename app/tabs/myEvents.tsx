import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchMyEvents } from "@/api/fetchMyEvent";
import { Event } from "@/type/event";
import { supabase } from "@/lib/supabase";
import { cancelParticipation } from "@/api/cancelParticipation";

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (userId) {
        const data = await fetchMyEvents(userId);
        setEvents(data);
      }

      setLoading(false);
    };

    fetchUserAndEvents();
  }, []);

  // Séparer les événements passés et à venir
  const today = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
  const pastEvents = events.filter((event) => new Date(event.date) < today);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Aucun événement trouvé.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Événements à venir */}
      {upcomingEvents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Événements à venir</Text>
          <FlatList
            data={upcomingEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.info}>
                  Date: {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text style={styles.info}>Lieu: {item.location.city}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    cancelParticipation(item.id, item.title, setEvents);
                  }}>
                  <Text style={styles.buttonText}>Annuler ma participation</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {/* Événements passés */}
      {pastEvents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Événements passés</Text>
          <FlatList
            data={pastEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.info}>
                  Date: {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text style={styles.info}>Lieu: {item.location.city}</Text>
                <Text style={styles.info}>Événement passé</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  eventCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  info: { fontSize: 14 },
  button: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
