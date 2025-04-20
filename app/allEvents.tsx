import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { fetchAllEvents } from "../api/fetchAllEvents";
import { useEffect, useState } from "react";
import { Event } from "@/type/event";

export default function AllEventsScreen() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all");
  const [selectedLocationFilter, setSelectedLocationFilter] =
    useState<string>("");

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchAllEvents();
      setEvents(data);
      setFilteredEvents(data);
    };

    getEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [selectedDateFilter, selectedLocationFilter, events]);

  const filterEvents = () => {
    let filtered = [...events];

    if (selectedDateFilter === "future") {
      filtered = filtered.filter((event) => new Date(event.date) > new Date());
    } else if (selectedDateFilter === "past") {
      filtered = filtered.filter((event) => new Date(event.date) < new Date());
    }

    if (selectedLocationFilter) {
      filtered = filtered.filter((event) =>
        event.location?.city
          .toLowerCase()
          .includes(selectedLocationFilter.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Events</Text>

      {/* Date Filter */}
      <Text style={styles.filterLabel}>Filter by Date</Text>
      <Picker
        selectedValue={selectedDateFilter}
        onValueChange={(itemValue) => setSelectedDateFilter(itemValue)}
        style={styles.picker}>
        <Picker.Item label="All Events" value="all" />
        <Picker.Item label="Future Events" value="future" />
        <Picker.Item label="Past Events" value="past" />
      </Picker>

      {/* Location Filter */}
      <Text style={styles.filterLabel}>Filter by Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={selectedLocationFilter}
        onChangeText={(text) => setSelectedLocationFilter(text)}
      />

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/events/${item.id}`)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.info}>
              Location: {item.location?.city || "Unknown"}
            </Text>
            <Text style={styles.info}>
              Date: {new Date(item.date).toLocaleDateString()}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "600" },
  info: { fontSize: 14, color: "#555" },
  filterLabel: { fontSize: 16, fontWeight: "600", marginTop: 20 },
  picker: { height: 50, width: "100%", marginTop: 10 },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
});
