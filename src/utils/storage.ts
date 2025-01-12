import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Store new high score if it's higher than the existing one.
 * @param score number
 * @param mode "time-trial" | "endless"
 */
export async function storeHighScore(score: number, mode: string) {
  try {
    const key = `@tapit_${mode}_highscore`;
    const existingScore = await AsyncStorage.getItem(key);
    const bestScore = existingScore ? parseInt(existingScore, 10) : 0;

    if (score > bestScore) {
      await AsyncStorage.setItem(key, score.toString());
    }
  } catch (error) {
    console.warn("Error storing highscore:", error);
  }
}

/**
 * Retrieve stored high score for a particular mode
 * @param mode "time-trial" | "endless"
 * @returns Promise<number>
 */
export async function getHighScore(mode: string): Promise<number> {
  try {
    const key = `@tapit_${mode}_highscore`;
    const score = await AsyncStorage.getItem(key);
    return score ? parseInt(score, 10) : 0;
  } catch (error) {
    console.warn("Error retrieving highscore:", error);
    return 0;
  }
}
