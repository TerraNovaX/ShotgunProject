// app/allevents.tsx
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { allEvents } from '../lib/data'; // ← Importation des événements depuis lib

export default function AllEventsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tous les événements</Text>
      <FlatList
        data={allEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/events/${item.id}`)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.info}>Lieu: {item.location}</Text>
            <Text style={styles.info}>Date: {item.date}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '600' },
  info: { fontSize: 14, color: '#555' },
});
