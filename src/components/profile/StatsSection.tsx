import React from 'react';
import { Box, Text } from '@/components/base';
import StatBox from './StatBox';
import { UserStats } from '@/types/models';

interface StatsSectionProps {
  stats: UserStats | null;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
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
      <Text variant="subheader" marginBottom="m" style={{ fontWeight: '600' }}>
        ✨ Your Stats
      </Text>
      <Box flexDirection="row" marginBottom="m">
        <StatBox
          label="Total Entries"
          value={stats?.totalEntries || 0}
          emoji="📊"
        />
        <StatBox
          label="Avg Rating"
          value={stats?.averageRating?.toFixed(1) || '0.0'}
          emoji="⭐"
        />
      </Box>
      <Box flexDirection="row">
        <StatBox
          label="Best Entry"
          value={stats?.bestEntry?.name || 'None'}
          emoji="🏆"
        />
        <StatBox
          label="Rating"
          value={stats?.bestEntry?.rating?.toFixed(1) || '0.0'}
          emoji="💯"
        />
      </Box>
    </Box>
  );
};

export default StatsSection;