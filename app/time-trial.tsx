import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Shape } from "../src/types/shape";
import Tile from "../src/components/tile";
import { storeHighScore } from "../src/utils/storage";
import GameOver from "../src/components/game-over";
import GameColors from "../src/colors"; // import your custom colors

type ColorKey = "red" | "blue" | "yellow";

const shapes: Shape[] = ["triangle", "square", "circle"];
const colorKeys: ColorKey[] = ["red", "blue", "yellow"];

export default function TimeTrial() {
  const [tiles, setTiles] = useState<{ shape: Shape; colorKey: ColorKey }[]>(
    []
  );
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
  }, []);

  // Start the 30-second countdown
  useEffect(() => {
    if (gameOver) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameOver]);

  const startNewGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    generateTiles();
  };

  const generateTiles = () => {
    // Generate 3 random tiles
    const newTiles = Array.from({ length: 3 }, () => ({
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      colorKey: colorKeys[Math.floor(Math.random() * colorKeys.length)],
    }));
    setTiles(newTiles);

    // Decide which index (0-2) is the target
    setTargetIndex(Math.floor(Math.random() * 3));
  };

  const onTimeUp = async () => {
    setGameOver(true);
    // Store the high score in AsyncStorage
    await storeHighScore(score, "time-trial");
  };

  const onTilePress = (index: number) => {
    if (gameOver) return;
    if (index === targetIndex) {
      setScore((prev) => prev + 1);
      generateTiles(); // generate next 3 tiles
    } else {
      // If "wrong" tile, we could penalize or do nothing; let's just generate new tiles
      generateTiles();
    }
  };

  const targetTile = tiles[targetIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Time Trial</Text>
      <Text style={styles.subheading}>Time Left: {timeLeft}s</Text>

      {gameOver ? (
        <GameOver
          title="Time's up! Your score:"
          score={score}
          onPress={startNewGame}
        />
      ) : (
        <>
          {targetTile && (
            <View style={styles.targetContainer}>
              <Text style={styles.label}>Target:</Text>
              <Tile
                shape={targetTile.shape}
                color={GameColors[targetTile.colorKey]}
                // No onPress for the target display
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

          <Text style={styles.label}>Score: {score}</Text>
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
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  targetContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  tilesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
