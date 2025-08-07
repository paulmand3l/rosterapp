import { ThemeNames } from "../theme/themes";

export interface RosterEntry {
  id: string;
  name: string;
  emoji: string;
  ratings: {
    [key: string]: number;
  };
  dates: DateEvent[];
  notes: string;
  redFlags: string[];
  greenFlags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DateEvent {
  id: string;
  location: string;
  date: string;
  notes: string;
  rating: number;
}

export interface UserProfile {
  avatar: string;
  theme: "light" | "dark";
  datingStyle: "casual" | "serious" | "exploring";
  badge: string;
  selectedRatings: string[];
  hasOnboarded: boolean;
  customTheme?: ThemeNames;
}

export interface RosterStats {
  totalEntries: number;
  averageRating: number;
  mostCommonFlag: string;
  bestEntry: {
    name: string;
    rating: number;
  };
  ghostingRate: number;
  datesByMonth: { [key: string]: number };
}

// Alias RosterStats as UserStats for better semantics in profile components
export type UserStats = RosterStats;

export interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}
