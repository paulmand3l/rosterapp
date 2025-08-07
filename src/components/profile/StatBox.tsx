import React from 'react';
import { Box, Text } from '@/components/base';

interface StatBoxProps {
  label: string;
  value: string | number;
  emoji: string;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, emoji }) => (
  <Box
    backgroundColor="cardBackground"
    padding="m"
    borderRadius="l"
    alignItems="center"
    flex={1}
    marginHorizontal="xs"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'visible'
    }}
  >
    <Box width={36} height={36} justifyContent="center" alignItems="center" marginBottom="s">
      <Text style={{ fontSize: 24, lineHeight: 36 }}>{emoji}</Text>
    </Box>
    <Text variant="subheader">{value}</Text>
    <Text variant="caption" color="textSecondary" marginTop="xs">
      {label}
    </Text>
  </Box>
);

export default StatBox;