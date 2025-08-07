import React from 'react';
import { Box, Text, Screen } from '@/components/base';
import { ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from '../types/navigation';
import { format } from 'date-fns';
import { Entry } from '@/types/roster';

type Props = NativeStackScreenProps<MainTabParamList, 'Stats'>;

const StatCard = ({
  icon,
  label,
  value,
  color = 'primary',
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string | number;
  color?: keyof Theme['colors'];
}) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      backgroundColor="cardBackground"
      padding="m"
      borderRadius="l"
      marginBottom="m"
    >
      <Box flexDirection="row" alignItems="center" marginBottom="s">
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.colors[color]}
          style={{ marginRight: 8 }}
        />
        <Text variant="body" color="textSecondary">
          {label}
        </Text>
      </Box>
      <Text variant="header" color={color}>
        {value}
      </Text>
    </Box>
  );
};

const StatsScreen = () => {
  const { stats } = useApp();
  // Create a dummy dates array since we don't have it in AppContext anymore
  const dates: Entry[] = [];
  const theme = useTheme<Theme>();

  if (!stats) {
    return (
      <Screen>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text variant="body" color="textSecondary">Loading stats...</Text>
        </Box>
      </Screen>
    );
  }

  const activeCount = dates.filter((d: Entry) => d.flags.length === 0).length;
  const archivedCount = dates.filter((d: Entry) => d.flags.length > 0).length;

  const monthEntries = Object.entries(stats.datesByMonth)
    .sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Animated.View entering={FadeIn}>
          <Text variant="header" marginBottom="l">
            Your Stats
          </Text>

          {/* Overview */}
          <Box
            backgroundColor="cardBackground"
            padding="m"
            borderRadius="l"
            marginBottom="l"
          >
            <Text variant="subheader" marginBottom="m">
              Overview
            </Text>
            <Box flexDirection="row">
              <Box flex={1} alignItems="center">
                <Text variant="header">{stats.totalEntries}</Text>
                <Text variant="caption" color="textSecondary">
                  Total Entries
                </Text>
              </Box>
              <Box flex={1} alignItems="center">
                <Text variant="header">{stats.averageRating.toFixed(1)}</Text>
                <Text variant="caption" color="textSecondary">
                  Avg Rating
                </Text>
              </Box>
              <Box flex={1} alignItems="center">
                <Text variant="header">{dates.length}</Text>
                <Text variant="caption" color="textSecondary">
                  People
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Highlights */}
          <Text variant="subheader" marginBottom="m">
            Highlights
          </Text>

          <StatCard
            icon="star"
            label="Best Entry"
            value={stats.bestEntry?.name || 'N/A'}
            color="primary"
          />

          <StatCard
            icon="flag"
            label="Most Common Flag"
            value={stats.mostCommonFlag || 'N/A'}
            color="success"
          />

          <StatCard
            icon="ghost"
            label="Ghosting Rate"
            value={`${(stats.ghostingRate * 100).toFixed(0)}%`}
            color="error"
          />

          {/* Activity */}
          <Text variant="subheader" marginBottom="m">
            Activity
          </Text>

          <Box
            backgroundColor="cardBackground"
            padding="m"
            borderRadius="l"
            marginBottom="m"
          >
            <Box flexDirection="row" justifyContent="space-between" marginBottom="m">
              <Box>
                <Text variant="caption" color="textSecondary">
                  Active
                </Text>
                <Text variant="subheader" color="success">
                  {activeCount}
                </Text>
              </Box>
              <Box>
                <Text variant="caption" color="textSecondary">
                  Archived
                </Text>
                <Text variant="subheader" color="error">
                  {archivedCount}
                </Text>
              </Box>
            </Box>

            <Text variant="caption" color="textSecondary" marginBottom="s">
              Dates by Month
            </Text>
            {monthEntries.map(([month, count]) => (
              <Box
                key={month}
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="xs"
              >
                <Text variant="body">
                  {format(new Date(month), 'MMMM yyyy')}
                </Text>
                <Text variant="body" color="primary">
                  {count}
                </Text>
              </Box>
            ))}
          </Box>
        </Animated.View>
      </ScrollView>
    </Screen>
  );
};

export default StatsScreen;