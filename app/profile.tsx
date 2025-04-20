import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [participations, setParticipations] = useState(0);
  const [shares, setShares] = useState(0);
  const [friends, setFriends] = useState(0);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleShareProfile = () => {
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

  const getInitialColor = () => {
    const colors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#A66DD4"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      {userData ? (
        <>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: getInitialColor() }]}>
              <Text style={styles.avatarText}>{userData.name?.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.info}>Email : {userData.email}</Text>
            <Text style={styles.info}>Événements participés : {participations}</Text>
            <Text style={styles.info}>Amis ajoutés : {friends}</Text>
            <Text style={styles.info}>Événements partagés : {shares}</Text>
            <Text style={styles.score}>Score : {score}</Text>

            {score >= 100 ? (
              <Text style={styles.access}>Accès premium débloqué</Text>
            ) : (
              <Text style={styles.locked}>
                Encore {100 - score} points pour débloquer le premium
              </Text>
            )}
            <Button title="Partager mon profil" onPress={handleShareProfile} />
          </View>
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
            <Button title="Simuler un clic" onPress={handleLinkClick} />
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#fff" },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
  },
  infoBox: {
    width: "100%",
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  access: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
  locked: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
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
    alignItems: "center",
  },
  link: { color: "blue", marginBottom: 10 },
});
