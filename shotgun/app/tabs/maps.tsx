import { View, Text, StyleSheet } from 'react-native';

export default function MapPage() {
  return (
    <View style={styles.container}>
      <Text>Carte des événements (Géolocalisation)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});