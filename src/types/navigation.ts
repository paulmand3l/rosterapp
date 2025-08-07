import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type OnboardingStackParamList = {
  Welcome: undefined;
  AvatarPicker: undefined;
  DatingQuiz: undefined;
};

export type MainTabParamList = {
  Roster: undefined;
  Stats: undefined;
  Challenges: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  EntryDetail: { id: string };
  NewEntry: undefined;
  EditEntry: { id: string };
};

export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;
export type OnboardingStackNavigationProp =
  NativeStackNavigationProp<OnboardingStackParamList>;
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
