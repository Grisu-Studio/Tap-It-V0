import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Tile from "../src/components/tile";
import GameOver from "../src/components/game-over";
import { Shape } from "../src/types/shape";
import { storeHighScore } from "../src/utils/storage";
import GameColors from "../src/colors"; // import your custom colors

type ColorKey = "red" | "blue" | "yellow";
const shapes: Shape[] = ["triangle", "square", "circle"];
const colorKeys: ColorKey[] = ["red", "blue", "yellow"];

// Adjust how long the player has to respond:
const INITIAL_TIME_LIMIT = 2.5; // in seconds

export default function Endless() {
  const [tiles, setTiles] = useState<{ shape: Shape; colorKey: ColorKey }[]>(
    []
  );
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLimit, setTimeLimit] = useState<number>(INITIAL_TIME_LIMIT);
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME_LIMIT);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
  }, []);

  // Timer for each "round"
  useEffect(() => {
    if (gameOver) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.01) {
          clearInterval(timerId);
          endGame();
          return 0;
        }
        return prev - 0.1; // decrement in 0.1 increments for smoother UI
      });
    }, 100);

    return () => clearInterval(timerId);
  }, [gameOver, timeLimit]);

  const startNewGame = () => {
    setGameOver(false);
    setScore(0);
    setTimeLimit(INITIAL_TIME_LIMIT);
    generateTiles();
    setTimeLeft(INITIAL_TIME_LIMIT);
  };

  const generateTiles = () => {
    const newTiles = Array.from({ length: 3 }, () => ({
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      colorKey: colorKeys[Math.floor(Math.random() * colorKeys.length)],
    }));
    setTiles(newTiles);
    setTargetIndex(Math.floor(Math.random() * 3));
  };

  const onTilePress = (index: number) => {
    if (gameOver) return;

    if (index === targetIndex) {
      // correct
      setScore((prev) => prev + 1);

      // (Optional) Increase difficulty by lowering time limit slightly
      const newLimit = Math.max(timeLimit - 0.05, 1);
      setTimeLimit(newLimit);

      // reset time for next round
      setTimeLeft(newLimit);
      generateTiles();
    } else {
      // wrong => game over
      endGame();
    }
  };

  const endGame = async () => {
    setGameOver(true);
    // store high score
    await storeHighScore(score, "endless");
  };

  const targetTile = tiles[targetIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Endless Mode</Text>
      {gameOver ? (
        <GameOver
          title="Game Over! Final Score:"
          score={score}
          onPress={startNewGame}
        />
      ) : (
        <>
          {targetTile && (
            <View style={styles.targetContainer}>
              <Text style={styles.label}>Tap this shape/color:</Text>
              <Tile
                shape={targetTile.shape}
                color={GameColors[targetTile.colorKey]}
              />
            </View>
          )}

          <View style={styles.tilesContainer}>
            {tiles.map((tile, i) => (
              <Tile
                key={i}
                shape={tile.shape}
                color={GameColors[tile.colorKey]}
                onPress={() => onTilePress(i)}
              />
            ))}
          </View>

          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.timeText}>Time left: {timeLeft.toFixed(1)}s</Text>
        </>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  targetContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  tilesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
  },
});
