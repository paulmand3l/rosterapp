import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { AppProvider, useApp } from './src/context/AppContext';
import { RosterProvider } from './src/context/RosterContext';
import { defaultTheme, themes } from './src/theme/themes';
import { storage } from './src/services/storage';
import { UserProfile } from './src/types/models';

// Wrapper with theme logic
const AppWithTheme = () => {
  const { userProfile } = useApp();
  const [activeTheme, setActiveTheme] = useState(defaultTheme);

  useEffect(() => {
    if (userProfile?.customTheme && themes[userProfile.customTheme]) {
      setActiveTheme(themes[userProfile.customTheme]);
    } else {
      setActiveTheme(defaultTheme);
    }
  }, [userProfile]);

  return (
    <ThemeProvider theme={activeTheme}>
      <RosterProvider>
        <Navigation />
        <StatusBar style="auto" />
      </RosterProvider>
    </ThemeProvider>
  );
};

export default function App() {
  // Need to load initial profile state before rendering main app
  const [initialProfile, setInitialProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialProfile = async () => {
      try {
        const profile = await storage.getUserProfile();
        setInitialProfile(profile);
      } catch (error) {
        console.error('Error loading initial profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialProfile();
  }, []);

  if (isLoading) {
    // Could show a splash screen here
    return null;
  }

  // Use default theme for initial render until context is available
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={defaultTheme}>
          <AppProvider initialProfile={initialProfile}>
            <AppWithTheme />
          </AppProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
