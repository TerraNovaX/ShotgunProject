import { View, TextInput, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { allEvents } from 'lib/data';

export default function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = allEvents.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un événement..."
        onChangeText={setQuery}
        value={query}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => router.push(`/events/${item.id}`)}
          >
            <Text>{item.title}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text>Aucun événement trouvé.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1 },
});
