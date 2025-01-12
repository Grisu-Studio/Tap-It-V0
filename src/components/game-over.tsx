import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import type GameOverType from "../types/game-over";

export default function GameOver({ title, score, onPress }: GameOverType) {
  return (
    <>
      <Text style={styles.gameOverText}>
        {title} {score}
      </Text>

      <TouchableOpacity style={styles.tryAgainButton} onPress={onPress}>
        <Text style={styles.tryAgainText}>Try Again</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  gameOverText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF343B",
    marginTop: 20,
  },
  tryAgainButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ccc",
    borderRadius: 8,
  },
  tryAgainText: {
    fontWeight: "bold",
  },
});
