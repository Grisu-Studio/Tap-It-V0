import { Shape } from "./shape";

export default interface Tile {
  color: string; // 'red' | 'blue' | 'yellow'
  shape: Shape;
  onPress?: () => void;
}
