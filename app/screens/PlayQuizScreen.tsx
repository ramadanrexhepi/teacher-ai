import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

// ---------------- QUIZ DATA ----------------
const animalsQuiz: Question[] = [
  { id: 1, question: "What is the largest mammal in the world?", options: [" Elephant", " Blue Whale", " Giraffe"], answer: " Blue Whale" },
  { id: 2, question: "Which animal is known as the 'king of the jungle'?", options: [" Tiger", " Lion", " Leopard"], answer: " Lion" },
  { id: 3, question: "How many legs does a spider have?", options: [" Six", " Eight", " Ten"], answer: " Eight" },
  { id: 4, question: "What is the fastest animal in the world?", options: [" Cheetah", " Horse", " Leopard"], answer: " Cheetah" },
  { id: 5, question: "Which bird is a universal symbol of peace?", options: [" Crow", " Dove", " Parrot"], answer: " Dove" },
  { id: 6, question: "A baby kangaroo is called a what?", options: [" Joey", " Cub", " Pup"], answer: " Joey" },
  { id: 8, question: "Which mammal can fly?", options: [" Bat", " Flying Squirrel", " Owl"], answer: " Bat" },
  { id: 9, question: "What is the only mammal that lays eggs?", options: [" Platypus", " Kangaroo", " Dolphin"], answer: " Platypus" },
  { id: 10, question: "Which animal has the longest lifespan?", options: [" Bowhead Whale", " Elephant", " Giant Tortoise"], answer: " Bowhead Whale" },
];

const natureQuiz: Question[] = [
  { id: 1, question: "What do plants need to grow?", options: [" 🌞 Sunlight", " 🎮 Games", " 🍕 Pizza"], answer: " 🌞 Sunlight" },
  { id: 2, question: "Which is a natural satellite of Earth?", options: [" 🌙 Moon", " ☀️ Sun", " ⭐ Star"], answer: " 🌙 Moon" },
  { id: 3, question: "What falls from clouds?", options: [" 🌧 Rain", " 🔥 Fire", " 🍎 Apples"], answer: " 🌧 Rain" },
];

const colorsQuiz: Question[] = [
  { id: 1, question: "What color is the sky?", options: [" 🔵 Blue", " 🟢 Green", " 🔴 Red"], answer: " 🔵 Blue" },
  { id: 2, question: "What color are bananas?", options: [" 🟡 Yellow", " ⚫ Black", " 🔴 Red"], answer: " 🟡 Yellow" },
  { id: 3, question: "What color is grass?", options: [" 🟢 Green", " 🔵 Blue", " 🟣 Purple"], answer: " 🟢 Green" },
];

const foodQuiz: Question[] = [
  { id: 1, question: "Which is a fruit?", options: [" 🍎 Apple", " 🥕 Carrot", " 🥦 Broccoli"], answer: " 🍎 Apple" },
  { id: 2, question: "Which food is sweet?", options: [" 🍫 Chocolate", " 🥒 Cucumber", " 🥩 Steak"], answer: " 🍫 Chocolate" },
  { id: 3, question: "Which food is made from milk?", options: [" 🧀 Cheese", " 🥔 Potato", " 🥕 Carrot"], answer: " 🧀 Cheese" },
];



// --------------------------------------------
export default function PlayQuizScreen() {
  const { mode } = useLocalSearchParams<{ mode: string }>();

  // Pick questions by mode
  let quizData: Question[] = [];
  switch (mode) {
    case "nature":
      quizData = natureQuiz;
      break;
    case "colors":
      quizData = colorsQuiz;
      break;
    case "food":
      quizData = foodQuiz;
      break;
    default:
      quizData = animalsQuiz;
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showResult, setShowResult] = useState(false);

  // Animation values
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  const question = quizData[currentQuestion];
  const progress = (currentQuestion + 1) / quizData.length;

  // Entrance + sparkle animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(sparkleAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, [currentQuestion]);

  // Trophy spin
  useEffect(() => {
    if (showResult) {
      Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true })
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [showResult]);

  const handleAnswer = (option: string) => {
    setSelected(option);
    if (option === question.answer) {
      setScore((prev) => prev + 1);
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.1, tension: 100, friction: 3, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 100, friction: 7, useNativeDriver: true }),
      ]).start();
    } else {
      setLives((prev) => prev - 1);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 15, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -15, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start();

      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.95, duration: 150, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }

    setTimeout(() => {
      if (lives <= 1 || currentQuestion + 1 === quizData.length) {
        setShowResult(true);
      } else {
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: -50, duration: 300, useNativeDriver: true }),
        ]).start(() => {
          setCurrentQuestion((prev) => prev + 1);
          setSelected(null);
          fadeAnim.setValue(0);
          slideAnim.setValue(50);
          scaleAnim.setValue(0);
          Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
          ]).start();
        });
      }
    }, 1500);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setCurrentQuestion(0);
    setSelected(null);
    setShowResult(false);
    fadeAnim.setValue(0);
    scaleAnim.setValue(0);
    slideAnim.setValue(50);
    shakeAnim.setValue(0);
    rotateAnim.setValue(0);
  };

  // ---------------- RESULT SCREEN ----------------
  if (showResult) {
    const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

    return (
      <View style={styles.resultContainer}>
        <Animated.View style={[styles.resultContent, { transform: [{ rotate: spin }] }]}>
          <Ionicons name="trophy" size={120} color="#FFD700" />
        </Animated.View>
        <Text style={styles.resultTitle}>Fantastic! 🎉</Text>
        <Text style={styles.finalScore}>{score} / {quizData.length}</Text>
        <TouchableOpacity style={styles.restartBtn} onPress={resetGame}>
          <FontAwesome5 name="redo-alt" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.restartText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---------------- QUIZ SCREEN ----------------
  return (
        <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
            <View style={styles.topBar}>
                <View style={styles.scoreContainer}>
                <FontAwesome5 name="star" size={20} color="#FFD700" solid />
                <Text style={styles.scoreText}>{score}</Text>
                </View>
                <View style={styles.lives}>
                {[...Array(3)].map((_, i) => (
                    <Animated.View
                    key={i}
                    style={[
                        styles.heartContainer,
                        {
                        opacity: i < lives ? 1 : 0.3,
                        transform: [{ scale: i < lives ? pulseAnim : 0.8 }],
                        },
                    ]}
                    >
                    <FontAwesome5 name="heart" size={24} color="#FF6B6B" solid />
                    </Animated.View>
                ))}
                </View>
            </View>

            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                Question {currentQuestion + 1} of {quizData.length}
                </Text>
                <Progress.Bar
                progress={progress}
                width={width - 60}
                height={8}
                color="#00C851"
                unfilledColor="rgba(255,255,255,0.3)"
                borderRadius={8}
                borderWidth={0}
                style={styles.progressBar}
                />
            </View>
            </View>

        <Animated.View
          style={[
            styles.card,
            { opacity: fadeAnim, transform: [{ translateX: shakeAnim }, { translateY: slideAnim }, { scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.question}>{question.question}</Text>
          {question.options.map((option) => {
            const isCorrect = option === question.answer;
            const isSelected = option === selected;
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionBtn,
                  isSelected && isCorrect && styles.correctOption,
                  isSelected && !isCorrect && styles.wrongOption,
                ]}
                onPress={() => handleAnswer(option)}
                disabled={selected !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d2ca91ff", alignItems: "center" },
  safeArea: { flex: 1, padding: 20 },
  header: { marginBottom: 30 },
  progressText: { color: "#1E3D59", fontSize: 16, fontWeight: "600", marginBottom: 10 },
  progressBar: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 8 },
  card: {
    width: 360,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    marginTop: 20,
  },
  question: { fontSize: 22, fontWeight: "bold", color: "#2c3e50", marginBottom: 20 },
  optionBtn: {
    backgroundColor: "rgba(74, 67, 67, 0.2)",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 8,
  },
  optionText: { fontSize: 18, fontWeight: "600", color: "#1E3D59" },
  correctOption: { backgroundColor: "#00C851" },
  wrongOption: { backgroundColor: "#FF4444" },
  resultContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#667eea", padding: 20 },
  resultContent: { marginBottom: 20 },
  resultTitle: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  finalScore: { fontSize: 48, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 15 },
  restartBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00C851",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  restartText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scoreText: { fontSize: 20, fontWeight: "bold", color: "#1E3D59", marginLeft: 8 },
  heartContainer: { marginHorizontal: 3 },
  progressContainer: { alignItems: "center" },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
lives: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
});