import React from 'react';
import { ScrollView } from 'react-native';
import { Screen } from '@/components/base';
import { useApp } from '@/context/AppContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemeNames } from '@/theme/themes';
import {
  ProfileHeader,
  StatsSection,
  ThemeSelector,
  ChallengesSection,
  DeveloperTools
} from '@/components/profile';

const ProfileScreen = () => {
  const { userProfile, stats, challenges, updateUserProfile } = useApp();

  // For theme selection
  const currentTheme = userProfile?.customTheme || "basicBabe" as ThemeNames;

  const handleThemeSelect = async (themeName: ThemeNames) => {
    if (!userProfile) return;

    // In a real app, we'd check if the user has purchased premium themes
    await updateUserProfile({
      ...userProfile,
      customTheme: themeName
    });
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Animated.View entering={FadeIn}>
          {/* Profile Header */}
          <ProfileHeader userProfile={userProfile} />

          {/* Theme Selector */}
          <ThemeSelector
            userProfile={userProfile}
            currentTheme={currentTheme}
            onThemeSelect={handleThemeSelect}
          />

          {/* Stats */}
          <StatsSection stats={stats} />

          {/* Challenges */}
          <ChallengesSection challenges={challenges} />

          {/* Developer Tools */}
          <DeveloperTools />
        </Animated.View>
      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;
