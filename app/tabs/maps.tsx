import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { supabase } from '@/lib/supabase';

const MapsScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [filterNearby, setFilterNearby] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) console.error('Erreur events :', error);
      else setAllEvents(data);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!location) return;

    if (filterNearby) {
      const nearby = allEvents.filter((event) => {
        const loc = typeof event.location === 'string'
          ? JSON.parse(event.location)
          : event.location;

        if (!loc?.latitude || !loc?.longitude) return false;

        const distance = getDistanceFromLatLonInKm(
          location.latitude,
          location.longitude,
          loc.latitude,
          loc.longitude
        );
        return distance <= 5;
      });
      setFilteredEvents(nearby);
    } else {
      setFilteredEvents(allEvents);
    }
  }, [location, allEvents, filterNearby]);

  function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  

  return (
    <View style={styles.container}>
      {location && (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
          >
            {filteredEvents.map((event) => {
              const loc = typeof event.location === 'string'
                ? JSON.parse(event.location)
                : event.location;

              if (!loc?.latitude || !loc?.longitude) return null;

              return (
                <Marker
                  key={event.id}
                  coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                  title={event.title}
                  description={loc.name}
                />
              );
            })}
          </MapView>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setFilterNearby(!filterNearby)}
          >
            <Text style={styles.buttonText}>
              {filterNearby ? 'Voir tous les événements' : ' Événements près de moi'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MapsScreen;
