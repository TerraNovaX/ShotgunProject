import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { allEvents } from '../../lib/data';

export default function EventDetails() {
  const { id } = useLocalSearchParams();

  const event = allEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Événement introuvable</Text>
        <Text>Vérifie l’ID ou reviens à la page d’accueil.</Text>
      </View>
    );
  }

  const handleParticipate = () => {
    Alert.alert('Participation enregistrée', `Tu participes à "${event.title}" !`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>Lieu: {event.location}</Text>
      <Text style={styles.info}>Date: {event.date} -  {event.time}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.buttonWrapper}>
        <Button title="Je participe" onPress={handleParticipate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 16, marginTop: 10, marginBottom: 20 },
  buttonWrapper: { marginTop: 20 },
});
