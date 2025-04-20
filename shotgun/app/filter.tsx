import { View, Text, StyleSheet, Switch, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const categories = ['Concert', 'Sport', 'Soirée', 'Atelier', 'Conférence'];

export default function FilterScreen() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [sortByPopularity, setSortByPopularity] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    router.push({
      pathname: '/',
      params: {
        categories: selectedCategories.join(','),
        isFree: isFreeOnly ? '1' : '0',
        popular: sortByPopularity ? '1' : '0',
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Catégories</Text>
      <View style={styles.list}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => toggleCategory(cat)}
            style={[styles.item, selectedCategories.includes(cat) && styles.selected]}
          >
            <Text>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.switchRow}>
        <Text>Gratuit seulement</Text>
        <Switch value={isFreeOnly} onValueChange={setIsFreeOnly} />
      </View>

      <View style={styles.switchRow}>
        <Text>Trier par popularité</Text>
        <Switch value={sortByPopularity} onValueChange={setSortByPopularity} />
      </View>

      <Pressable style={styles.button} onPress={applyFilters}>
        <Text style={styles.buttonText}>Appliquer les filtres</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#cce5ff',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});