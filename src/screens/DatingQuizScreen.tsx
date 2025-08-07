import React, { useState } from 'react';
import { Box, Text, Button, Screen } from '@/components/base';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackNavigationProp, RootStackNavigationProp } from '../types/navigation';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { storage } from '../services/storage';
import { CompositeNavigationProp } from '@react-navigation/native';
import { UserProfile } from '../types/models';

const QUESTIONS = [
  {
    id: 'datingStyle',
    question: 'What\'s your dating style?',
    options: [
      { value: 'casual' as const, label: '🌴 Keeping it casual' },
      { value: 'serious' as const, label: '💍 Looking for something serious' },
      { value: 'exploring' as const, label: '🌈 Open to possibilities' },
      { value: 'friends' as const, label: '🤝 Friends first' },
    ],
  },
  {
    id: 'dealBreakers',
    question: 'What\'s your biggest deal-breaker?',
    options: [
      { value: 'communication', label: '📱 Poor communication' },
      { value: 'respect', label: '🚫 Lack of respect' },
      { value: 'goals', label: '🎯 Different life goals' },
      { value: 'honesty', label: '🤥 Dishonesty' },
    ],
  },
  {
    id: 'idealDate',
    question: 'Your ideal first date is...',
    options: [
      { value: 'coffee', label: '☕️ Coffee chat' },
      { value: 'dinner', label: '🍽️ Dinner date' },
      { value: 'activity', label: '🎨 Fun activity' },
      { value: 'walk', label: '🌳 Park walk' },
    ],
  },
];

type DatingQuizScreenNavigationProp = CompositeNavigationProp<
  OnboardingStackNavigationProp,
  RootStackNavigationProp
>;

const DatingQuizScreen = () => {
  const navigation = useNavigation<DatingQuizScreenNavigationProp>();
  const { updateUserProfile, userProfile, completeOnboarding } = useAppContext();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  const handleAnswer = async (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));

    if (isLastQuestion) {
      await updateUserProfile({
        datingStyle: value as UserProfile['datingStyle'],
        theme: 'light',
        badge: 'Newbie',
        selectedRatings: ['vibe', 'humor', 'communication', 'chemistry', 'consistency', 'hotness', 'style', 'greenFlags', 'redFlags', 'ghostingRisk'],
      });
      await completeOnboarding();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  return (
    <Screen padding="m">
      <Animated.View entering={FadeIn} style={{ flex: 1 }}>
        <Box flex={1}>
          <Text variant="header" textAlign="center" marginBottom="m">
            Quick Dating Quiz
          </Text>
          <Text variant="body" textAlign="center" color="textSecondary" marginBottom="xl">
            Let's understand your dating preferences
          </Text>

          <Box flex={1} justifyContent="center">
            <Text variant="subheader" marginBottom="l">
              {currentQuestion.question}
            </Text>

            {currentQuestion.options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleAnswer(currentQuestion.id, option.value)}
              >
                <Box
                  padding="m"
                  marginBottom="s"
                  backgroundColor="cardBackground"
                  style={{ borderRadius: 12 }}
                >
                  <Text variant="body">{option.label}</Text>
                </Box>
              </TouchableOpacity>
            ))}
          </Box>

          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text variant="caption" color="textSecondary">
              Question {currentQuestionIndex + 1} of {QUESTIONS.length}
            </Text>
            <Box
              flexDirection="row"
              style={{ gap: 4 }}
            >
              {QUESTIONS.map((_, index) => (
                <Box
                  key={index}
                  width={8}
                  height={8}
                  backgroundColor={index === currentQuestionIndex ? 'primary' : 'cardBackground'}
                  style={{ borderRadius: 4 }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Animated.View>
    </Screen>
  );
};

export default DatingQuizScreen;