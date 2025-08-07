import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../services/storage";

const STORAGE_KEYS = [
  "@roster/roster",
  "@roster/user_profile",
  "@roster/challenges",
  "@roster/stats",
  "@roster/onboarding_completed",
];

interface DebugResult {
  success: boolean;
  message: string;
  data?: any;
}

export const debugUtils = {
  async clearStorage(): Promise<DebugResult> {
    try {
      await AsyncStorage.multiRemove(STORAGE_KEYS);
      return { success: true, message: "Storage cleared successfully!" };
    } catch (error) {
      return { success: false, message: `Error clearing storage: ${error}` };
    }
  },

  async getStorageState(): Promise<DebugResult> {
    try {
      const [roster, profile, challenges, stats, onboardingCompleted] =
        await Promise.all([
          storage.getRoster(),
          storage.getUserProfile(),
          storage.getChallenges(),
          storage.getStats(),
          storage.getOnboardingCompleted(),
        ]);

      return {
        success: true,
        message: "Storage state retrieved successfully",
        data: {
          roster,
          profile,
          challenges,
          stats,
          onboardingCompleted,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Error getting storage state: ${error}`,
      };
    }
  },
};
