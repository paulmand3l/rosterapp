import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text as RNText, Dimensions } from 'react-native';
import { Box, Text } from './base';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme/themes';
import Modal from 'react-native-modal';

export const EMOJIS = [
  "😍", "😘", "🥰", "🔥", "💖", "🫶",
  "💯", "😎", "🌹", "🦋", "💫", "🧸",
  "🌞", "🍷", "🧠", "✨", "🐶", "👀",
  "🫦", "🍑", "🍒", "🍆", "🌶️", "💦",
  "🫠", "😏", "🤭", "🤤", "😈", "👅",
  "🛐", "🪩", "🎧", "📸", "🛏️", "🧃",
  "🧿", "🫃", "🍯", "🥵", "🥴", "🫥",
  "🔒", "🔑", "🧩", "🎯", "🎲", "🪜",
  "🧨", "🎇", "🎭", "🎬", "🎮", "💻",
  "🏹", "🧲", "⛓️", "🪐", "🌊", "🌙",
  "🐏", "🐂", "🦋", "🦀", "🦁", "🌾",
  "⚖️", "🦂", "🏹", "🐐", "🧜‍♂️", "🐟",
  "🦊", "🐻", "🦁", "🐼", "🦒", "🐰"
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose, isVisible }) => {
  const theme = useTheme<Theme>();
  const { height: screenHeight } = Dimensions.get('window');

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
      useNativeDriver
    >
      <Box
        backgroundColor="cardBackground"
        padding="m"
        borderRadius="l"
        width="100%"
        maxHeight={screenHeight * 0.6}
        style={styles.modalContent}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="m"
        >
          <Text variant="subheader">Select Emoji</Text>
          <TouchableOpacity onPress={onClose}>
            <Text variant="body" color="primary">Done</Text>
          </TouchableOpacity>
        </Box>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between" style={styles.emojiGrid}>
            {EMOJIS.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onSelect(emoji);
                  onClose();
                }}
                style={styles.emojiButton}
              >
                <RNText style={styles.emoji}>{emoji}</RNText>
              </TouchableOpacity>
            ))}
          </Box>
        </ScrollView>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 16,
    justifyContent: 'center',
  },
  modalContent: {
    alignSelf: 'center',
  },
  scrollContent: {
    paddingBottom: 0,
  },
  emojiGrid: {
    paddingBottom: 0,
  },
  emojiButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  emoji: {
    fontSize: 32,
    textAlign: 'center',
  },
});

export default EmojiPicker;