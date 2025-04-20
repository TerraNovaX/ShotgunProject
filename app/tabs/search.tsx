import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const results = [
    { id: '1', title: 'Festival gratuit' },
    { id: '2', title: 'Soirée rooftop' },
  ];

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Rechercher..." onChangeText={setQuery} />
      <FlatList
        data={results.filter(e => e.title.toLowerCase().includes(query.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1 },
});
