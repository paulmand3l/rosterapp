import React from 'react';
import { Box, Text, Button, Screen } from '@/components/base';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackNavigationProp } from '../types/navigation';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const WelcomeScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  return (
    <Screen padding="m">
      <Animated.View
        entering={FadeIn.delay(300)}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text variant="header" textAlign="center" marginBottom="m">
          Welcome to Roster 📝
        </Text>
        <Text variant="body" textAlign="center" color="textSecondary" marginBottom="xl">
          Your personal dating journal to track, reflect, and grow in your dating life.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600)}>
        <Box marginBottom="xl">
          <Text variant="subheader" marginBottom="m">What you can do:</Text>
          <Box marginBottom="s">
            <Text variant="body">✨ Track your dates and rate experiences</Text>
          </Box>
          <Box marginBottom="s">
            <Text variant="body">🚩 Keep track of red and green flags</Text>
          </Box>
          <Box marginBottom="s">
            <Text variant="body">📊 Get insights from your dating patterns</Text>
          </Box>
          <Box marginBottom="s">
            <Text variant="body">🎯 Complete challenges to improve your dating life</Text>
          </Box>
        </Box>

        <Button
          variant="primary"
          label="Get Started"
          onPress={() => navigation.navigate('AvatarPicker')}
        />
      </Animated.View>
    </Screen>
  );
};

export default WelcomeScreen;