import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default function Home() {
  const fakeEvents = [
    { id: '1', title: 'Concert électro', category: 'Musique' },
    { id: '2', title: 'Conférence Tech', category: 'Pro' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Événements recommandés</Text>
      <FlatList
        data={fakeEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>{item.category}</Text>
          </View>
        )}
      />
      <Button title="Filtres" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
});