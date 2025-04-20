import {  View,  Text,  StyleSheet,  Button,  Alert,  ActivityIndicator, Modal, Pressable} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchEventById } from "../../api/fetchEventById";
import { Event } from "@/type/event";
import MapView, { Marker } from "react-native-maps";
import { participateToEvent } from "@/api/participateToEvent";
import { supabase } from "@/lib/supabase";


export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState<number>(0);
  const [shares, setShares] = useState<number>(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userDiamonds, setUserDiamonds] = useState(0);

  useEffect(() => {
    const fetchUserScore = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const uid = user?.id;
      if (!uid) return;

      const { data: participations } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', uid);

      const { data: shares } = await supabase
        .from('event_shares')
        .select('*')
        .eq('user_id', uid);

      const { data: friends } = await supabase
        .from('friends')
        .select('*')
        .or(`sender.eq.${uid},receiver.eq.${uid}`);

      const score =
        (participations?.length || 0) * 5 +
        (shares?.length || 0) * 15 +
        (friends?.length || 0) * 20;

      setUserDiamonds(score);
    };

    fetchUserScore();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);
    useEffect(() => {
      if (typeof id === "string") {
        fetchEventById(id).then((e) => {
          setEvent(e);
          setLoading(false);
        });
      }
  }, [id]);

  const handleShareEvent = () => {
    setModalVisible(true);
  };

  const handleLinkClick = async () => {
    const newScore = score + 15;
    const newShares = shares + 1;
  
    setScore(newScore);
    setShares(newShares);
    setModalVisible(false);
    Alert.alert("Merci !", `Ton score est maintenant de ${newScore}`);
  
    if (userId && event?.id) {
      await supabase.from("event_shares").insert([
        {
          user_id: userId,
          event_id: event.id,
        },
      ]);
    }
  }; 


  const handleParticipate = () => {
    Alert.alert(
      "Participation enregistrée",
      `Tu participes à "${event?.title}" !`
    );
    if (event?.id) {
      participateToEvent(event.id, event.title);
    }
  };

  const handleBack = () => {
    router.push("/tabs/home");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Événement introuvable</Text>
        <Text>Vérifie l’ID ou reviens à la page d’accueil.</Text>
        <View style={styles.buttonWrapper}>
          <Button title="Retour" onPress={handleBack} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Retour" onPress={handleBack} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>
        Lieu: {event.location?.name} -- {event.location?.city}
      </Text>
      <MapView
        style={{ height: 150, borderRadius: 10 }}
        initialRegion={{
          latitude: event.location.latitude,
          longitude: event.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{
            latitude: event.location.latitude,
            longitude: event.location.longitude,
          }}
          title={event.title}
        />
      </MapView>
      <Text style={styles.info}>
        Date: {new Date(event.date).toLocaleDateString()}
      </Text>
      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.buttonWrapper}>
        {event.is_premium && userDiamonds < 100 ? (
          <Text style={{ color: 'red' }}>Tu as besoin de 100 diamants pour accéder à cet événement premium.</Text>
        ) : (
          <Button title="Je participe" onPress={handleParticipate} />
        )}
        <Button title="Partager cet événement" onPress={handleShareEvent} />
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Voici ton lien de partage :</Text>
            <Text style={styles.link}>
              https://monapp.com/event/{event?.id}
            </Text>
            <Button
              title="Clique ici pour simuler un clic"
              onPress={handleLinkClick}
            />
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 16, marginTop: 10, marginBottom: 20 },
  buttonWrapper: { marginTop: 20 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    marginVertical: 10,
    textAlign: 'center',
  },
  
});
