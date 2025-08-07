import React, { useState, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from '@/components/base';
import { FLAGS } from '@/constants/entry';

interface FlagSelectorProps {
  selectedFlags: string[];
  onToggleFlag: (flag: string) => void;
  mode?: 'edit' | 'view';
}

const INITIAL_FLAG_COUNT = 12;

export const FlagSelector: React.FC<FlagSelectorProps> = ({
  selectedFlags,
  onToggleFlag,
  mode = 'edit',
}) => {
  const [showAll, setShowAll] = useState(false);

  // Calculate initial order once when component mounts
  const initialOrder = useRef<typeof FLAGS>(
    (() => {
      const selected = FLAGS.filter(flag => selectedFlags.includes(flag.text));
      const unselected = FLAGS.filter(flag => !selectedFlags.includes(flag.text));
      const maxFlags = Math.max(INITIAL_FLAG_COUNT, selectedFlags.length);
      return [...selected, ...unselected].slice(0, maxFlags);
    })()
  );

  const visibleFlags = useMemo(() => {
    if (showAll) return FLAGS;
    return initialOrder.current;
  }, [showAll]);

  return (
    <Box>
      <Box flexDirection="row" flexWrap="wrap" gap="s">
        {visibleFlags.map(({ text, emoji }) => (
          <TouchableOpacity
            key={text}
            onPress={() => mode === 'edit' && onToggleFlag(text)}
            disabled={mode === 'view'}
            style={[
              styles.flagButton,
              selectedFlags.includes(text) && styles.selectedFlag
            ]}
          >
            <Box flexDirection="row" alignItems="center" gap="xs">
              <Text style={styles.emoji}>{emoji}</Text>
              <Text
                variant="caption"
                color={selectedFlags.includes(text) ? "white" : "text"}
                style={styles.flagText}
              >
                {text}
              </Text>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>

      {!showAll && FLAGS.length > INITIAL_FLAG_COUNT && (
        <TouchableOpacity
          onPress={() => setShowAll(true)}
          style={styles.showMoreButton}
        >
          <Text variant="caption" color="textSecondary">
            Show more
          </Text>
        </TouchableOpacity>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  flagButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  selectedFlag: {
    backgroundColor: '#FF69B4',
  },
  emoji: {
    fontSize: 16,
  },
  flagText: {
    fontSize: 13,
  },
  showMoreButton: {
    marginTop: 8,
    paddingVertical: 4,
  },
});