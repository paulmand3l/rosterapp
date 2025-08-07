import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile, Challenge, RosterStats } from "../types/models";
import { Entry } from "../types/roster";

const STORAGE_KEYS = {
  ROSTER: "@roster/roster",
  USER_PROFILE: "@roster/user_profile",
  CHALLENGES: "@roster/challenges",
  STATS: "@roster/stats",
  ONBOARDING_COMPLETED: "@roster/onboarding_completed",
};

export const storage = {
  // Roster Entries
  async getRoster(): Promise<Entry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ROSTER);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting roster:", error);
      return [];
    }
  },

  async saveRoster(roster: Entry[]): Promise<void> {
    try {
      console.log("Storage: Saving roster with", roster.length, "entries");
      const jsonData = JSON.stringify(roster);
      console.log("Storage: JSON data size:", jsonData.length, "characters");

      await AsyncStorage.setItem(STORAGE_KEYS.ROSTER, jsonData);

      // Verify the save was successful
      const saved = await AsyncStorage.getItem(STORAGE_KEYS.ROSTER);
      if (!saved) {
        console.error(
          "Storage: Failed to verify saved data - no data returned"
        );
        throw new Error("Failed to save roster data");
      }
      console.log("Storage: Roster saved and verified successfully");
    } catch (error) {
      console.error("Storage: Error saving roster:", error);
      throw error; // Re-throw the error to allow callers to handle it
    }
  },

  async addEntry(entry: Entry): Promise<void> {
    const roster = await this.getRoster();
    roster.push(entry);
    await this.saveRoster(roster);
  },

  async updateEntry(updatedEntry: Entry): Promise<void> {
    const roster = await this.getRoster();
    const index = roster.findIndex((e) => e.id === updatedEntry.id);
    if (index !== -1) {
      roster[index] = updatedEntry;
      await this.saveRoster(roster);
    }
  },

  // User Profile
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  },

  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_PROFILE,
        JSON.stringify(profile)
      );
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  },

  // Challenges
  async getChallenges(): Promise<Challenge[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CHALLENGES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting challenges:", error);
      return [];
    }
  },

  async saveChallenges(challenges: Challenge[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CHALLENGES,
        JSON.stringify(challenges)
      );
    } catch (error) {
      console.error("Error saving challenges:", error);
    }
  },

  // Stats
  async getStats(): Promise<RosterStats | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting stats:", error);
      return null;
    }
  },

  async saveStats(stats: RosterStats): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (error) {
      console.error("Error saving stats:", error);
    }
  },

  // Onboarding
  async getOnboardingCompleted(): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED
      );
      return data ? JSON.parse(data) : false;
    } catch (error) {
      console.error("Error getting onboarding status:", error);
      return false;
    }
  },

  async saveOnboardingCompleted(completed: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED,
        JSON.stringify(completed)
      );
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  },

  // Debug
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
      console.log("Storage cleared successfully!");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
