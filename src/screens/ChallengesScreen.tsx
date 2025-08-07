import React from 'react';
import { Box, Text, Button, Screen } from '@/components/base';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { format } from 'date-fns';
import { Challenge } from '../types/models';

const ChallengeCard = ({
  title,
  description,
  type,
  reward,
  completed,
  expiresAt,
  onComplete,
}: {
  title: string;
  description: string;
  type: 'weekly' | 'special';
  reward: number;
  completed: boolean;
  expiresAt: string;
  onComplete: () => void;
}) => (
  <Box
    backgroundColor="cardBackground"
    padding="m"
    borderRadius="l"
    marginBottom="m"
  >
    <Box flexDirection="row" justifyContent="space-between" marginBottom="s">
      <Text variant="subheader">{title}</Text>
      <Text
        variant="caption"
        color={completed ? 'success' : 'primary'}
      >
        {completed ? '✅ Completed' : '🎯 Active'}
      </Text>
    </Box>
    <Text variant="body" color="textSecondary" marginBottom="m">
      {description}
    </Text>
    <Box flexDirection="row" marginBottom="s">
      <Box
        backgroundColor="primary"
        paddingHorizontal="s"
        paddingVertical="xs"
        borderRadius="xs"
        marginRight="xs"
      >
        <Text variant="caption" color="white">
          {type === 'weekly' ? 'Weekly' : 'Special'}
        </Text>
      </Box>
      <Box
        backgroundColor="primaryLight"
        paddingHorizontal="s"
        paddingVertical="xs"
        borderRadius="xs"
      >
        <Text variant="caption" color="text">
          +{reward} pts
        </Text>
      </Box>
    </Box>
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <Text variant="caption" color="textSecondary">
        Expires: {format(new Date(expiresAt), 'MMM d, yyyy')}
      </Text>
      {!completed && (
        <Button
          variant="primary"
          label="Complete"
          onPress={onComplete}
        />
      )}
    </Box>
  </Box>
);

const ChallengesScreen = () => {
  const { challenges, updateChallenge } = useApp();

  const handleComplete = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      updateChallenge({
        ...challenge,
        completed: true,
      });
    }
  };

  const activeChallenges = challenges.filter(c => !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Animated.View entering={FadeIn}>
          <Text variant="header" marginBottom="l">
            Dating Challenges
          </Text>

          {activeChallenges.length === 0 && completedChallenges.length === 0 ? (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant="body" color="textSecondary">
                No challenges available yet. Check back soon!
              </Text>
            </Box>
          ) : (
            <>
              {activeChallenges.length > 0 && (
                <Box marginBottom="l">
                  <Text variant="subheader" marginBottom="m">
                    Active Challenges
                  </Text>
                  {activeChallenges.map(challenge => (
                    <ChallengeCard
                      key={challenge.id}
                      {...challenge}
                      onComplete={() => handleComplete(challenge.id)}
                    />
                  ))}
                </Box>
              )}

              {completedChallenges.length > 0 && (
                <Box>
                  <Text variant="subheader" marginBottom="m">
                    Completed Challenges
                  </Text>
                  {completedChallenges.map(challenge => (
                    <ChallengeCard
                      key={challenge.id}
                      {...challenge}
                      onComplete={() => {}}
                    />
                  ))}
                </Box>
              )}
            </>
          )}
        </Animated.View>
      </ScrollView>
    </Screen>
  );
};

export default ChallengesScreen;