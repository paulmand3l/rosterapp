import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '@/components/base';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ThemeOptionProps {
  name: string;
  description: string;
  emoji: string;
  isPremium: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
  name,
  description,
  emoji,
  isPremium,
  isSelected,
  onSelect
}) => (
  <TouchableOpacity onPress={onSelect} activeOpacity={0.7}>
    <Animated.View entering={FadeInDown.delay(100)} style={{ marginBottom: 12 }}>
      <Box
        flexDirection="row"
        backgroundColor={isSelected ? "primary" : "cardBackground"}
        padding="m"
        borderRadius="l"
        alignItems="center"
        style={{
          borderWidth: isSelected ? 2 : 0,
          borderColor: isSelected ? "rgba(255, 255, 255, 0.3)" : "transparent",
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Box
          width={42}
          height={42}
          justifyContent="center"
          alignItems="center"
          marginRight="m"
        >
          <Text style={{ fontSize: 28, lineHeight: 42 }}>{emoji}</Text>
        </Box>
        <Box flex={1}>
          <Box flexDirection="row" alignItems="center">
            <Text
              variant="subheader"
              color={isSelected ? "textLight" : "text"}
              marginRight="xs"
            >
              {name}
            </Text>
            {isPremium && (
              <Box
                backgroundColor={isSelected ? "accent" : "primary"}
                paddingHorizontal="s"
                paddingVertical="xs"
                borderRadius="full"
              >
                <Text variant="caption" color={isSelected ? "text" : "textLight"}>✨ PREMIUM</Text>
              </Box>
            )}
          </Box>
          <Text
            variant="caption"
            color={isSelected ? "textLight" : "textSecondary"}
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Animated.View>
  </TouchableOpacity>
);

export default ThemeOption;