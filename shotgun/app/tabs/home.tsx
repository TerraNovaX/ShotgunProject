// app/index.tsx (ou app/tabs/index.tsx)
import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const fakeEvents = [
  { id: '1', title: 'Concert électro', date: '2025-04-22', location: 'Paris' },
  { id: '2', title: 'Festival de jazz', date: '2025-05-01', location: 'Marseille' },
  { id: '3', title: 'Soirée étudiante', date: '2025-04-25', location: 'Lyon' },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Événements recommandés</Text>
      <FlatList
        data={fakeEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/events/${item.id}`)}
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text>{item.location} - {item.date}</Text>
          </Pressable>
        )}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Voir tous les événements" onPress={() => router.push('/allEvents')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  buttonWrapper: { marginTop: 20 },
});
