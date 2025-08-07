import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '@/components/base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import Animated, { FadeIn } from 'react-native-reanimated';

interface EmptyRosterStateProps {
  onAddPress: () => void;
}

export const EmptyRosterState: React.FC<EmptyRosterStateProps> = ({ onAddPress }) => {
  const theme = useTheme<Theme>();

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding="l">
      <MaterialCommunityIcons
        name="account-group"
        size={64}
        color={theme.colors.textSecondary}
      />
      <Text
        variant="header"
        color="text"
        marginTop="l"
        marginBottom="m"
        textAlign="center"
      >
        Your Roster is Empty
      </Text>
      <Text
        variant="body"
        color="textSecondary"
        textAlign="center"
        marginBottom="xl"
      >
        Don't worry, that's easy to fix.
      </Text>
      <TouchableOpacity
        onPress={onAddPress}
        style={{
          backgroundColor: theme.colors.primary,
          paddingHorizontal: theme.spacing.l,
          paddingVertical: theme.spacing.m,
          borderRadius: theme.borderRadii.l,
        }}
      >
        <Text variant="button" color="white">
          Add to your roster
        </Text>
      </TouchableOpacity>
    </Box>
  );
};