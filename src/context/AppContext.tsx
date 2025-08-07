import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { UserProfile, Challenge, RosterStats } from '../types/models';
import { Entry } from '../types/roster';

// Only keep what's not related to the roster in this context
interface AppContextType {
  // Data
  userProfile: UserProfile | null;
  challenges: Challenge[];
  stats: RosterStats | null;

  // Actions
  saveUserProfile: (profile: UserProfile) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateChallenge: (challenge: Challenge) => Promise<void>;
  refreshStats: (entries: Entry[]) => Promise<void>;
  completeOnboarding: () => Promise<void>;

  // State
  isLoading: boolean;
  hasOnboarded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
  initialProfile?: UserProfile | null;
}> = ({ children, initialProfile = null }) => {
  // Remove roster state from here
  const [userProfile, setUserProfile] = useState<UserProfile | null>(initialProfile);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [stats, setStats] = useState<RosterStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Don't load roster here anymore
      const [loadedProfile, loadedChallenges, loadedStats, loadedOnboardingCompleted] = await Promise.all([
        // Only load profile if not already provided
        initialProfile ? Promise.resolve(initialProfile) : storage.getUserProfile(),
        storage.getChallenges(),
        storage.getStats(),
        storage.getOnboardingCompleted(),
      ]);

      setUserProfile(loadedProfile);
      setChallenges(loadedChallenges || []);
      setStats(loadedStats);
      setOnboardingCompleted(loadedOnboardingCompleted);
    } catch (error) {
      console.error('Error loading initial data:', error);
      setChallenges([]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (rosterEntries: Entry[]): RosterStats => {
    const totalEntries = rosterEntries.length;
    const allRatings = rosterEntries.map(entry =>
      Object.values(entry.ratings).reduce((sum, r) => sum + r, 0) / Object.keys(entry.ratings).length
    );
    const averageRating = allRatings.length
      ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
      : 0;

    const allFlags = rosterEntries.reduce((flags, entry) => {
      return [...flags, ...entry.flags];
    }, [] as string[]);

    const flagCounts = allFlags.reduce((counts, flag) => {
      counts[flag] = (counts[flag] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });

    const mostCommonFlag = Object.entries(flagCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

    const bestEntry = rosterEntries.reduce((best, entry) => {
      const rating = Object.values(entry.ratings)
        .reduce((sum, r) => sum + r, 0) / Object.keys(entry.ratings).length;
      return rating > best.rating ? { name: entry.name, rating } : best;
    }, { name: '', rating: 0 });

    const datesByMonth: { [key: string]: number } = {};
    rosterEntries.forEach(entry => {
      entry.dates.forEach(date => {
        const month = new Date(date.date).toISOString().slice(0, 7);
        datesByMonth[month] = (datesByMonth[month] || 0) + 1;
      });
    });

    return {
      totalEntries,
      averageRating,
      mostCommonFlag,
      bestEntry,
      ghostingRate: 0, // This would need more complex logic based on activity
      datesByMonth,
    };
  };

  // Move roster operations to RosterContext
  const saveUserProfile = async (profile: UserProfile) => {
    await storage.saveUserProfile(profile);
    setUserProfile(profile);
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updatedProfile = { ...userProfile, ...updates };
    await saveUserProfile(updatedProfile);
  };

  const updateChallenge = async (challenge: Challenge) => {
    const newChallenges = challenges.map(c =>
      c.id === challenge.id ? challenge : c
    );
    await storage.saveChallenges(newChallenges);
    setChallenges(newChallenges);
  };

  const refreshStats = async (entries: Entry[]) => {
    try {
      console.log("AppContext: Refreshing stats with", entries.length, "entries");

      if (!entries || entries.length === 0) {
        console.log("AppContext: No entries provided, using empty stats");
        const emptyStats = {
          totalEntries: 0,
          averageRating: 0,
          mostCommonFlag: '',
          bestEntry: { name: '', rating: 0 },
          ghostingRate: 0,
          datesByMonth: {},
        };
        await storage.saveStats(emptyStats);
        setStats(emptyStats);
        return;
      }

      const newStats = calculateStats(entries);
      console.log("AppContext: Stats calculated:", JSON.stringify(newStats));

      await storage.saveStats(newStats);
      console.log("AppContext: Stats saved to storage");

      setStats(newStats);
      console.log("AppContext: Stats state updated");
    } catch (error) {
      console.error("AppContext: Error refreshing stats:", error);
      // Don't re-throw as stats are non-critical
    }
  };

  const completeOnboarding = async () => {
    await storage.saveOnboardingCompleted(true);
    setOnboardingCompleted(true);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        challenges,
        stats,
        isLoading,
        hasOnboarded: onboardingCompleted,
        saveUserProfile,
        updateUserProfile,
        updateChallenge,
        refreshStats,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};