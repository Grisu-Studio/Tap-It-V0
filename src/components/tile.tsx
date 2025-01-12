import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import type TileType from "../types/tile";

/**
 * Renders a tile with a given shape and color.
 * shape: 'square' | 'circle' | 'triangle'
 * color: 'red' | 'blue' | 'yellow'
 */
export default function Tile({ shape, color, onPress }: TileType) {
  let shapeComponent = null;

  if (shape === "square") {
    shapeComponent = (
      <View style={[styles.square, { backgroundColor: color }]} />
    );
  } else if (shape === "circle") {
    shapeComponent = (
      <View style={[styles.circle, { backgroundColor: color }]} />
    );
  } else if (shape === "triangle") {
    shapeComponent = (
      <View style={[styles.triangle, { borderBottomColor: color }]} />
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {shapeComponent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 80,
    height: 80,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 80,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    // borderBottomColor is set dynamically
  },
});
