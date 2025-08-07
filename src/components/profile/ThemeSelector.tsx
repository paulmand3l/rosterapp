import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '@/components/base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { Theme, themeInfo, ThemeNames } from '@/theme/themes';
import ThemeOption from './ThemeOption';
import Animated, { FadeIn } from 'react-native-reanimated';
import { UserProfile } from '@/types/models';

interface ThemeSelectorProps {
  userProfile: UserProfile | null;
  currentTheme: ThemeNames;
  onThemeSelect: (themeName: ThemeNames) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  userProfile,
  currentTheme,
  onThemeSelect
}) => {
  const theme = useTheme<Theme>();
  const [showThemes, setShowThemes] = useState(false);

  // Render the free and premium theme sections
  const renderThemeOptions = () => {
    // Group themes by premium status
    const freeThemes = Object.entries(themeInfo)
      .filter(([_, info]) => !info.isPremium)
      .map(([key]) => key as ThemeNames);

    const premiumThemes = Object.entries(themeInfo)
      .filter(([_, info]) => info.isPremium)
      .map(([key]) => key as ThemeNames);

    return (
      <Animated.View entering={FadeIn}>
        <Box marginBottom="l">
          <Text variant="subheader" marginBottom="m">
            Free Themes
          </Text>
          {freeThemes.map((themeName) => (
            <ThemeOption
              key={themeName}
              name={themeInfo[themeName].name}
              description={themeInfo[themeName].description}
              emoji={themeInfo[themeName].emoji}
              isPremium={false}
              isSelected={currentTheme === themeName}
              onSelect={() => onThemeSelect(themeName)}
            />
          ))}
        </Box>

        <Box marginBottom="l">
          <Text variant="subheader" marginBottom="m">
            Premium Theme Packs
          </Text>
          {premiumThemes.map((themeName) => (
            <ThemeOption
              key={themeName}
              name={themeInfo[themeName].name}
              description={themeInfo[themeName].description}
              emoji={themeInfo[themeName].emoji}
              isPremium={true}
              isSelected={currentTheme === themeName}
              onSelect={() => onThemeSelect(themeName)}
            />
          ))}
        </Box>
      </Animated.View>
    );
  };

  return (
    <>
      {/* Theme Selector Toggle */}
      <TouchableOpacity onPress={() => setShowThemes(!showThemes)}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="cardBackground"
          padding="m"
          borderRadius="l"
          marginBottom="l"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Box flexDirection="row" alignItems="center">
            <Box width={32} height={32} justifyContent="center" alignItems="center" marginRight="xs">
              <Text style={{ fontSize: 24, lineHeight: 32 }}>🎨</Text>
            </Box>
            <Text variant="subheader">Theme Settings</Text>
          </Box>
          <MaterialCommunityIcons
            name={showThemes ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.colors.text}
          />
        </Box>
      </TouchableOpacity>

      {/* Theme Options */}
      {showThemes && renderThemeOptions()}
    </>
  );
};

export default ThemeSelector;