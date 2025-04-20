// app/tabs/myEvents.tsx
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchMyEvents } from "@/api/fetchMyEvent";
import { Event } from "@/type/event";
import { supabase } from "@/lib/supabase";

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
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.info}>
              Date: {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={styles.info}>Lieu: {item.location.city}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  eventCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  info: { fontSize: 14 },
});
