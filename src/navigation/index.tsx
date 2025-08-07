import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  RootStackParamList,
  MainStackParamList,
  MainTabParamList,
  OnboardingStackParamList,
} from '../types/navigation';
import { useApp } from '../context/AppContext';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/themes';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import AvatarPickerScreen from '../screens/AvatarPickerScreen';
import DatingQuizScreen from '../screens/DatingQuizScreen';
import RosterScreen from '../screens/RosterScreen';
import EntryDetailScreen from '../screens/EntryDetailScreen';
import NewEntryScreen from '../screens/NewEntryScreen';
import StatsScreen from '../screens/StatsScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const TabIcon: React.FC<{ emoji: string; color: string }> = ({ emoji, color }) => (
  <Text style={{
    fontSize: 26,
    color,
    textAlign: 'center',
    lineHeight: 32,
    width: 32,
    height: 32,
  }}>{emoji}</Text>
);

const OnboardingNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
    <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
    <OnboardingStack.Screen name="AvatarPicker" component={AvatarPickerScreen} />
    <OnboardingStack.Screen name="DatingQuiz" component={DatingQuizScreen} />
  </OnboardingStack.Navigator>
);

const MainTabNavigator = () => {
  const theme = useTheme<Theme>();

  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.cardBackground,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingTop: 8,
          height: 96,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarItemStyle: {
          padding: 4,
        },
      }}
    >
      <MainTab.Screen
        name="Roster"
        component={RosterScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon emoji="📝" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon emoji="📊" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon emoji="🎯" color={color} />,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon emoji="👤" color={color} />,
        }}
      />
    </MainTab.Navigator>
  );
};

const MainNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="MainTabs" component={MainTabNavigator} />
    <MainStack.Screen name="EntryDetail" component={EntryDetailScreen} />
    <MainStack.Screen name="NewEntry" component={NewEntryScreen} />
  </MainStack.Navigator>
);

const Navigation = () => {
  const { hasOnboarded } = useApp();
  const theme = useTheme<Theme>();

  // Create a navigation theme that matches our app theme
  const navigationTheme = {
    dark: false,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.cardBackground,
      text: theme.colors.text,
      border: theme.colors.cardBackground,
      notification: theme.colors.error,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;