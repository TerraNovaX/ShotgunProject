import { View, Text, FlatList, Pressable, StyleSheet, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format, isToday, isTomorrow } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { supabase } from '@/lib/supabase';



const cities = ['Paris', 'Marseille', 'Lyon', 'Versailles', 'Toulouse', 'Nice', 'Bordeaux', 'Lille', 'Strasbourg', 'Nantes'];

export default function Home() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFreeOnly, setIsFreeOnly] = useState<boolean>(false);


  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*');
  
      if (error) {
        console.error('Erreur lors du fetch des événements :', error);
      } else {
        setAllEvents(data);
      }
  
      setLoading(false);
    };
  
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...allEvents];
  
    const cats = (searchParams.categories as string)?.split(',') || [];
    const isFree = searchParams.isFree === '1';
  
    if (cats.length > 0) {
      filtered = filtered.filter((e) => cats.includes(e.category));
    }
  
    if (isFree) {
      filtered = filtered.filter((e) => !e.is_premium);
    }
  
    setFilteredEvents(filtered);
  }, [allEvents, searchParams.categories, searchParams.isFree]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);


  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityModalVisible(false);
  };  

  const groupEventsByDate = () => {
    const today = new Date();
  
    // 🔁 On parse d'abord les éventuels objets `location` qui seraient en string JSON
    const parsedEvents = filteredEvents.map(event => ({
      ...event,
      location: typeof event.location === 'string' ? JSON.parse(event.location) : event.location,
    }));
  
    const groups: Record<string, { label: string; date: Date; events: typeof filteredEvents }> = {};
  
    parsedEvents.forEach((event) => {
      const eventDate = new Date(event.date);
      if (selectedCity && event.location?.city !== selectedCity) return;
      if (selectedDate && eventDate.toDateString() !== selectedDate.toDateString()) return;
  
      let label = format(eventDate, "EEE dd MMM", { locale: fr });
      if (isToday(eventDate)) label = "Aujourd’hui";
      else if (isTomorrow(eventDate)) label = "Demain";
  
      const dateKey = eventDate.toDateString();
  
      if (!groups[dateKey]) {
        groups[dateKey] = {
          label,
          date: eventDate,
          events: [],
        };
      }
  
      groups[dateKey].events.push(event);
    });
  
    return Object.values(groups).sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  
  
  const eventsGrouped = groupEventsByDate();

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <Pressable onPress={() => setCityModalVisible(true)}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.filterText}>{selectedCity || 'Ville'}</Text>
        </Pressable>

        <Pressable onPress={() => setDatePickerVisibility(true)}>
          <Ionicons name="calendar-outline" size={24} />
          <Text style={styles.filterText}>
            {selectedDate ? selectedDate.toLocaleDateString() : 'Date'}
          </Text>
        </Pressable>

        <Pressable onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter-outline" size={24} />
          <Text style={styles.filterText}>Filtres</Text>
        </Pressable>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        locale="fr-FR"
      />

      <Modal
        isVisible={isCityModalVisible}
        onBackdropPress={() => setCityModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choisis une ville</Text>
          <FlatList
            data={cities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable style={styles.cityItem} onPress={() => handleCitySelect(item)}>
                <Text style={styles.cityText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>

      <Modal
        isVisible={isFilterModalVisible}
          onBackdropPress={() => setFilterModalVisible(false)}
          style={styles.modal}
        >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtres</Text>

          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Catégories</Text>
          {Array.from(new Set(allEvents.map(e => e.category))).map((cat) => (
            <Pressable
              key={cat}
              style={{
                padding: 8,
                borderBottomWidth: 1,
                borderColor: '#eee',
                backgroundColor: selectedCategories.includes(cat) ? '#ddd' : 'white',
              }}
              onPress={() => {
                if (selectedCategories.includes(cat)) {
                  setSelectedCategories(selectedCategories.filter(c => c !== cat));
                } else {
                  setSelectedCategories([...selectedCategories, cat]);
                }
              }}
            >
              <Text>{cat}</Text>
            </Pressable>
          ))}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
            <Pressable
              onPress={() => setIsFreeOnly(true)}
              style={{
                flex: 1,
                marginRight: 10,
                padding: 10,
                backgroundColor: isFreeOnly ? '#ddd' : '#f5f5f5',
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <Text>Gratuit</Text>
            </Pressable>

            <Pressable
              onPress={() => setIsFreeOnly(false)}
              style={{
                flex: 1,
                marginLeft: 10,
                padding: 10,
                backgroundColor: !isFreeOnly ? '#ddd' : '#f5f5f5',
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <Text>Premium</Text>
            </Pressable>
          </View>


          <Button
            title="Appliquer les filtres"
            onPress={() => {
              const params: any = {};
              if (selectedCategories.length > 0) {
                params.categories = selectedCategories.join(',');
              }
              if (isFreeOnly) {
                params.isFree = '1';
              }

              router.setParams(params); 
              setFilterModalVisible(false);
            }}
          />
          <Button
            title="Réinitialiser les filtres"
            color="red"
            onPress={() => {
              setSelectedCategories([]);
              setIsFreeOnly(false);
              setSelectedCity(null);
              setSelectedDate(null);
              router.setParams({}); // Réinitialise les query params
              setFilterModalVisible(false);
            }}
          />

        </View>
      </Modal>

      <FlatList
        data={groupEventsByDate()}
        keyExtractor={(item) => item.date.toISOString()}
        ListEmptyComponent={
          <Text style={{ marginTop: 20 }}>Aucun événement pour ces filtres.</Text>
        }
        renderItem={({ item }) => (
          <View>
            <Text style={styles.sectionTitle}>{item.label}</Text>
            {item.events.map((event) => (
              <Pressable
                key={event.id}
                style={styles.card}
                onPress={() => router.push(`/events/${event.id}`)}
              >
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text>
                  {event.location.name}, {event.location.city} - {format(new Date(event.date), "HH:mm")}
                </Text>
              </Pressable>
            ))}
          </View>
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
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  filterText: { fontSize: 12, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  buttonWrapper: { marginTop: 20 },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '75%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cityItem: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  cityText: {
    fontSize: 16,
    textAlign: 'center',
  },
  
});
