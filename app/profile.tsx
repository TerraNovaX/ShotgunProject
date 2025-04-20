import { View, Text, StyleSheet, Button, Modal, Linking } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [participations, setParticipations] = useState(0);
  const [shares, setShares] = useState(0);
  const [friends, setFriends] = useState(0);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleShareProfile = () => {
    const userName = userData?.name; 
    const profileLink = `https://monapp.com/profil/${userName}`; 

    setModalVisible(true);
  };

  const handleShareEvent = () => {
    setModalVisible(true);
  };
  

  const handleLinkClick = async () => {
    const newScore = score + 20; 
    setScore(newScore);
    setShares(friends + 1);
    alert("Merci d'avoir cliqué sur le lien !");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name,id')
          .eq('id', user.id)
          .single();
        console.log(profile); 

        const { data: participationsData } = await supabase
          .from('event_participants')
          .select('id')
          .eq('user_id', user.id);
        const { data: sharesData } = await supabase
          .from('event_shares')
          .select('id')
          .eq('user_id', user.id);
        const { data: friendsData } = await supabase
          .from('friends')
          .select('id')
          .eq('user_id', user.id);

        const participationCount = participationsData?.length || 0;
        const sharesCount = sharesData?.length || 0;
        const friendsCount = friendsData?.length || 0;

        const calculatedScore = (friendsCount * 20) + (sharesCount * 15) + (participationCount * 5);

        setUserData(profile);
        setParticipations(participationCount);
        setShares(sharesCount);
        setFriends(friendsCount);
        setScore(calculatedScore);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>Profil</Text>
          <Text style={styles.info}>👤 {userData.name}</Text>
          <Text style={styles.info}>📧 {userData.email}</Text>
          <Text style={styles.info}>🎟️ Événements participés : {participations}</Text>
          <Text style={styles.info}>👥 Amis ajoutés : {friends}</Text>
          <Text style={styles.info}>🔗 Événements partagés : {shares}</Text>
          <Text style={styles.score}>💎 Score : {score}</Text>
          {score >= 100 ? (
            <Text style={styles.access}>🔓 Accès aux événements premium débloqué !</Text>
          ) : (
            <Text style={styles.locked}>
              🔒 {100 - score} Diamants avant l'accès aux événements premium
            </Text>
          )}
          <Button title="Ajouter un ami" onPress={handleShareProfile} />
        </>
      ) : (
        <Text>Chargement...</Text>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Voici votre lien de partage:</Text>
            <Text style={styles.link}>
              https://monapp.com/profil/{userData?.id}
            </Text>
            <Button
              title="Cliquez ici pour simuler le clic"
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
  score: { fontSize: 16, marginBottom: 5 },
  access: { fontSize: 16, color: "green" },
  locked: { fontSize: 16, color: "red" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  link: { color: "blue", marginBottom: 10 },
});
