import React, { useState } from 'react';
import { Box, Text, Button, Screen } from '@/components/base';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackNavigationProp } from '../types/navigation';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/themes';

const AVATARS = [
  '👩', '👨', '👱‍♀️', '👱‍♂️', '👩‍🦰', '👨‍🦰', '👩‍🦱', '👨‍🦱',
  '👩‍🦳', '👨‍🦳', '👩‍🦲', '👨‍🦲', '🧑‍🦰', '🧑‍🦱', '🧑‍🦳', '🧑‍🦲'
];

const AvatarPickerScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const { saveUserProfile } = useAppContext();
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const theme = useTheme<Theme>();

  const handleContinue = async () => {
    try {
      await saveUserProfile({
        avatar: selectedAvatar,
        theme: 'light',
        datingStyle: 'casual',
        badge: 'Newbie',
        selectedRatings: [],
        hasOnboarded: false,
        customTheme: 'default'
      });
      // Add a small delay to ensure the profile is saved
      setTimeout(() => {
        navigation.navigate('DatingQuiz');
      }, 100);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <Screen>
      <Box flex={1} padding="m">
        <Box flex={1} justifyContent="center">
          <Text variant="header" textAlign="center" marginBottom="m">
            Choose Your Avatar
          </Text>
          <Text variant="body" textAlign="center" color="textSecondary" marginBottom="xl">
            Pick an emoji that represents you best
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            <Box flexDirection="row" flexWrap="wrap" justifyContent="center">
              {AVATARS.map((avatar) => (
                <TouchableOpacity
                  key={avatar}
                  onPress={() => setSelectedAvatar(avatar)}
                >
                  <Box
                    margin="s"
                    padding="m"
                    style={{
                      borderRadius: 12,
                      width: 70,
                      height: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    backgroundColor={selectedAvatar === avatar ? 'primary' : 'cardBackground'}
                  >
                    <Text variant="header" style={{ fontSize: 40 }}>
                      {avatar}
                    </Text>
                  </Box>
                </TouchableOpacity>
              ))}
            </Box>
          </ScrollView>
        </Box>

        <Box paddingVertical="l">
          <Button
            variant="primary"
            label="Continue"
            onPress={handleContinue}
          />
        </Box>
      </Box>
    </Screen>
  );
};

export default AvatarPickerScreen;