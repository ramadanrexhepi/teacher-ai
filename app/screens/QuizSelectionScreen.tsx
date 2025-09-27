import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function QuizSelectionScreen() {
  const router = useRouter();

  const modes = [
    { id: "animals", title: "Animals", icon: "paw", color: "#FF6B6B" },
    { id: "nature", title: "Nature", icon: "leaf", color: "#4CAF50" },
    { id: "colors", title: "Colors", icon: "palette", color: "#667eea" },
    { id: "food", title: "Food", icon: "apple-alt", color: "#FFA500" },
    { id: "geography", title: "Geography", icon: "globe", color: "#FF6B6B" },
    { id: "history", title: "History", icon: "book", color: "#4CAF50" },
    { id: "sports", title: "Sports", icon: "sports-baseball", color: "#667eea" },
    { id: "technology", title: "Technology", icon: "cloudsmith", color: "#FFA500" },
    { id: "artists", title: "Artists", icon: "human", color: "#FF6B6B" },
    { id: "cars", title: "Cars", icon: "car", color: "#4CAF50" },
    { id: "politics", title: "Politics", icon: "news", color: "#667eea" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🎮 Choose Your Quiz!</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {modes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[styles.card, { backgroundColor: mode.color }]}
              onPress={() =>
                router.push({
                  pathname: "/screens/PlayQuizScreen",
                  params: { mode: mode.id },
                })
              }
            >
              <FontAwesome5
                name={mode.icon as any}
                size={40}
                color="#fff"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.cardText}>{mode.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFBE0", alignItems: "center", padding: 20 },
  header: { fontSize: 28, fontWeight: "bold", color: "#1E3D59", marginBottom: 30, marginTop: 30, textAlign: "center" },
  cardContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  card: {
    width: 140,
    height: 140,
    borderRadius: 20,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  scrollContainer: {
    paddingBottom: 40, },// so you can scroll a bit past last item
});
