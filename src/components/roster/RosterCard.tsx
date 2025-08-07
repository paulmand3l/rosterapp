import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text } from '@/components/base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import { Entry } from '@/types/roster';
import { RATING_CATEGORIES } from '@/constants/entry';
import { format } from 'date-fns';

interface RosterCardProps {
  entry: Entry;
  onPress: () => void;
}

export const RosterCard: React.FC<RosterCardProps> = ({ entry, onPress }) => {
  const theme = useTheme<Theme>();
  const averageRating =
    Object.entries(entry.ratings)
      .filter(([key]) => RATING_CATEGORIES.some(category => category.id === key))
      .reduce((sum, [, r]) => sum + r, 0) /
    (Object.keys(entry.ratings).length || 1);

  return (
    <Box paddingHorizontal="s">
      <TouchableOpacity onPress={onPress}>
        <Box
          backgroundColor="cardBackground"
          padding="s"
          borderRadius="l"
          marginBottom="m"
          shadowColor="text"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevation={2}
        >
          <Box flexDirection="row" alignItems="center">
            <Box alignItems="center" justifyContent="center" marginRight="m">
              <Text style={styles.emoji}>{entry.emoji}</Text>
            </Box>
            <Box flex={1}>
              <Text variant="subheader" marginBottom="xs">
                {entry.name ? entry.name : "Unnamed"}
              </Text>
              <Text variant="caption" color="textSecondary">
                Added {format(new Date(entry.createdAt), 'MMM d, yyyy')}
              </Text>
            </Box>
            <Box
              backgroundColor="primary"
              paddingHorizontal="m"
              paddingVertical="s"
              borderRadius="xl"
            >
              <Text variant="caption" color="white">
                {averageRating.toFixed(1)}
              </Text>
            </Box>
          </Box>

          <Box flexDirection="row" flexWrap="wrap">
            {entry.flags.map(flag => (
              <Box
                key={flag}
                backgroundColor="primaryLight"
                paddingHorizontal="m"
                paddingVertical="s"
                borderRadius="l"
                marginRight="s"
                marginBottom="s"
              >
                <Text variant="caption" color="primary">
                  {flag}
                </Text>
              </Box>
            ))}
          </Box>

          {entry.dates.length > 0 && (
            <Box
              flexDirection="row"
              alignItems="center"
              marginTop="s"
            >
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text variant="caption" color="textSecondary" marginLeft="xs">
                {entry.dates.length} {entry.dates.length === 1 ? 'date' : 'dates'}
              </Text>
            </Box>
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 48,
    lineHeight: 56,
  },
});