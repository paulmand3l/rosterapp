import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  NewEntry: undefined;
  DateProfile: { id: string };
  ThemePicker: undefined;
  Feedback: { dateId: string };
  SharePreview: { dateId: string };
};

export type MainTabParamList = {
  Roster: undefined;
  Insights: undefined;
  Challenges: undefined;
  Customize: undefined;
  Profile: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  AvatarPicker: undefined;
  DatingQuiz: undefined;
  FirstEntry: undefined;
};
