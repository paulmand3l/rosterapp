import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from '@/components/base';
import { RATING_CATEGORIES } from '@/constants/entry';

interface RatingSelectorProps {
  category: string;
  value: number;
  onChange: (value: number) => void;
}

export const RatingSelector: React.FC<RatingSelectorProps> = ({
  category,
  value,
  onChange,
}) => {
  const ratingCategory = RATING_CATEGORIES.find(r => r.id === category);
  const displayName = ratingCategory?.label || category;
  const emojis = ratingCategory?.emojis || ["💀", "😕", "😐", "🙂", "😍"];

  return (
    <Box marginBottom="m">
      <Text variant="body" marginBottom="xs">{displayName}</Text>
      <Box flexDirection="row" gap="m">
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            onPress={() => onChange(rating)}
            style={styles.emojiButton}
          >
            <Text style={[
              styles.ratingEmoji,
              rating === value && styles.selectedRating
            ]}>
              {emojis[rating - 1]}
            </Text>
          </TouchableOpacity>
        ))}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  emojiButton: {
    padding: 2,
  },
  ratingEmoji: {
    fontSize: 32,
    lineHeight: 40,
    opacity: 0.3,
  },
  selectedRating: {
    opacity: 1,
    transform: [{ scale: 1.5 }],
  },
});