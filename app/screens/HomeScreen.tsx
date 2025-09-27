import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header / Mascot */}
      <View style={styles.header}>
        <Ionicons name="school" size={60} color="#1E3D59" />
        <Text  style={styles.title} >Welcome, Little Explorer!</Text>
        <Text style={styles.subtitle}>
          Let’s learn new things in a fun way 
        </Text>
      </View>

      {/* Action Cards */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#4CAF50" }]}
          onPress={() => router.push("/screens/CameraScreen")}
        >
          <Ionicons name="camera" size={40} color="white" />
          <Text style={styles.cardText}>Learn with Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FF8C42" }]}
          onPress={() => router.push("/screens/QuizSelectionScreen")}
        >
          <MaterialIcons name="quiz" size={40} color="white" />
          <Text style={styles.cardText}>Play Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#3F72AF" }]}
          onPress={() => alert("My Learning coming soon!")}
        >
          <Entypo name="book" size={40} color="white" />
          <Text style={styles.cardText}>My Learning</Text>
        </TouchableOpacity>
      </View>

      {/* Fun Fact */}
      <View style={styles.factBox}>
      {/* Row for icon + title */}
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="desk-lamp" size={40} color="#1E3D59" />
        <Text style={styles.factTitle}> Did you know?</Text>
      </View>

      {/* Fact text below */}
      <Text style={styles.factText}>
        Elephants are the only animals that can’t jump! 
      </Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFBE0",
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    color: "black",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3D59",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#1E3D59",
    textAlign: "center",
    marginTop: 5,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  card: {
    width: 140,
    height: 140,
    borderRadius: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
 factBox: {
    backgroundColor: "#A7E9AF",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    alignItems: "flex-start",
    marginTop: 20,
  },
  titleRow: {
    flexDirection: "row", // 👈 new style added
    alignItems: "center",
    marginBottom: 10,
  },
  factTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10, // space between icon and text
    color: "#1E3D59",
  },
  factText: {
    fontSize: 16,
    color: "#333",
  },
});
