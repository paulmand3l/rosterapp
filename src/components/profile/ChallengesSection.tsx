import React from 'react';
import { Box, Text } from '@/components/base';
import { Challenge } from '@/types/models';

interface ChallengesSectionProps {
  challenges: Challenge[];
}

const ChallengesSection: React.FC<ChallengesSectionProps> = ({ challenges }) => {
  const completedChallenges = challenges.filter(c => c.completed);

  return (
    <Box
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
      <Box flexDirection="row" alignItems="center" marginBottom="m">
        <Text style={{ fontSize: 24, marginRight: 8 }}>🎯</Text>
        <Text variant="subheader" style={{ fontWeight: '600' }}>
          Challenges
        </Text>
      </Box>
      <Box
        backgroundColor="accent"
        paddingHorizontal="m"
        paddingVertical="s"
        borderRadius="l"
      >
        <Text variant="body" color="text" style={{ textAlign: 'center' }}>
          {completedChallenges.length} completed
        </Text>
      </Box>
    </Box>
  );
};

export default ChallengesSection;