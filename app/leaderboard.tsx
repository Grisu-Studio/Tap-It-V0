import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { getHighScore } from "../src/utils/storage";

export default function Leaderboard() {
  const [bestTimeTrial, setBestTimeTrial] = useState<number>(0);
  const [bestEndless, setBestEndless] = useState<number>(0);

  useEffect(() => {
    // On mount, load the best scores from AsyncStorage
    (async () => {
      const timeTrialScore = await getHighScore("time-trial");
      const endlessScore = await getHighScore("endless");
      setBestTimeTrial(timeTrialScore);
      setBestEndless(endlessScore);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Leaderboard!</Text>
      <Text style={styles.scoreText}>
        Best Time-Trial Score: {bestTimeTrial}
      </Text>
      <Text style={styles.scoreText}>Best Endless Score: {bestEndless}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 18,
    marginVertical: 6,
  },
});
