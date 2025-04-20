// app/events/[id].tsx
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchEventById } from "../../api/fetchEventById";
import { Event } from "@/type/event";
import MapView, { Marker } from "react-native-maps";
import { participateToEvent } from "@/api/participateToEvent";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === "string") {
      fetchEventById(id).then((e) => {
        setEvent(e);
        setLoading(false);
      });
    }
  }, [id]);

  const handleParticipate = () => {
    Alert.alert(
      "Participation enregistrée",
      `Tu participes à "${event?.title}" !`
    );
    if (event?.id) {
      participateToEvent(event.id, event.title);
    }
  };

  const handleBack = () => {
    router.push("/tabs/home");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Événement introuvable</Text>
        <Text>Vérifie l’ID ou reviens à la page d’accueil.</Text>
        <View style={styles.buttonWrapper}>
          <Button title="Retour" onPress={handleBack} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Retour" onPress={handleBack} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>
        Lieu: {event.location?.name} -- {event.location?.city}
      </Text>
      <MapView
        style={{ height: 150, borderRadius: 10 }}
        initialRegion={{
          latitude: event.location.latitude,
          longitude: event.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{
            latitude: event.location.latitude,
            longitude: event.location.longitude,
          }}
          title={event.title}
        />
      </MapView>
      <Text style={styles.info}>
        Date: {new Date(event.date).toLocaleDateString()}
      </Text>
      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.buttonWrapper}>
        <Button title="Je participe" onPress={handleParticipate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 16, marginTop: 10, marginBottom: 20 },
  buttonWrapper: { marginTop: 20 },
});
