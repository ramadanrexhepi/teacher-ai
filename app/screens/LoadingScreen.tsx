import { useRouter } from "expo-router"; // ✅ Expo Router navigation hook
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/screens/HomeScreen"); 
      // 👆 This will go to app/screens/HomeScreen.tsx
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://img.icons8.com/color/96/learning.png" }}
        style={styles.logo}
      />
      <Text style={styles.title}>AI Tutor for Kids</Text>
      <Text style={styles.subtitle}>Getting ready to learn...</Text>
      <ActivityIndicator size="large" color="#FFD93D" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A7E9AF",
  },
  
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3D59",
  },
  subtitle: {
    fontSize: 16,
    color: "#1E3D59",
    marginTop: 8,
  },
});
