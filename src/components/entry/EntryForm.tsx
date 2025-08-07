import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Text as RNText } from 'react-native';
import { Box, Text, Button, Screen } from '@/components/base';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import EmojiPicker from '@/components/EmojiPicker';
import { RatingSelector } from '@/components/entry/RatingSelector';
import { FlagSelector } from '@/components/entry/FlagSelector';
import { HowWeMetPicker } from '@/components/entry/HowWeMetPicker';
import { RATING_CATEGORIES, ROSTER_LABELS } from '@/constants/entry';
import type { Entry } from '@/types/roster';
import { Ionicons } from '@expo/vector-icons';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

interface EntryFormProps {
  emoji: string;
  name: string;
  howWeMet: string;
  age: string;
  height: string;
  flags: string[];
  ratings: Record<string, number>;
  notes: string;
  showEmojiPicker: boolean;
  showHowWeMetPicker: boolean;
  onEmojiChange: (emoji: string) => void;
  onNameChange: (name: string) => void;
  onHowWeMetChange: (howWeMet: string) => void;
  onAgeChange: (age: string) => void;
  onHeightChange: (height: string) => void;
  onFlagToggle: (flag: string) => void;
  onRatingChange: (category: string, value: number) => void;
  onNotesChange: (notes: string) => void;
  onShowEmojiPicker: (show: boolean) => void;
  onShowHowWeMetPicker: (show: boolean) => void;
  headerTitle: string;
  onCancel: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
  entryName?: string;
}

export const EntryForm: React.FC<EntryFormProps> = ({
  emoji,
  name,
  howWeMet,
  age,
  height,
  flags,
  ratings,
  notes,
  showEmojiPicker,
  showHowWeMetPicker,
  onEmojiChange,
  onNameChange,
  onHowWeMetChange,
  onAgeChange,
  onHeightChange,
  onFlagToggle,
  onRatingChange,
  onNotesChange,
  onShowEmojiPicker,
  onShowHowWeMetPicker,
  headerTitle,
  onCancel,
  onDelete,
  children,
  entryName,
}) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const notesInputRef = useRef<TextInput>(null);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [randomLabel, setRandomLabel] = useState(ROSTER_LABELS[0]);

  const getRandomRosterLabel = () => {
    const randomIndex = Math.floor(Math.random() * ROSTER_LABELS.length);
    return ROSTER_LABELS[randomIndex];
  };

  const handleNotesFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleMenuPress = () => {
    setRandomLabel(getRandomRosterLabel());
    actionSheetRef.current?.show();
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={insets.top}
      >
        <Box flex={1}>
          <Box
            padding="m"
            borderBottomWidth={1}
            borderBottomColor="cardBackground"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="header">{headerTitle}</Text>
            {headerTitle.startsWith('New') ? (
              <TouchableOpacity onPress={onCancel}>
                <Text color="textSecondary">Cancel</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleMenuPress}>
                <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
          </Box>

          <ActionSheet ref={actionSheetRef}>
            <Box padding="m">
              {onDelete && (
                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current?.hide();
                    onDelete();
                  }}
                  style={styles.actionSheetItem}
                >
                  <Ionicons name="trash-outline" size={24} color={theme.colors.error} />
                  <Text color="error" marginLeft="m">Delete {entryName || randomLabel}</Text>
                </TouchableOpacity>
              )}
            </Box>
          </ActionSheet>

          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16 }}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
          >
            <Animated.View entering={FadeIn}>
              <TouchableOpacity
                onPress={() => onShowEmojiPicker(true)}
                style={styles.emojiButton}
              >
                <RNText style={styles.emoji}>{emoji}</RNText>
              </TouchableOpacity>

              <Box marginTop="m">
                <Text variant="subheader" marginBottom="s">Name</Text>
                <TextInput
                  value={name}
                  onChangeText={onNameChange}
                  placeholder="Enter name"
                  placeholderTextColor={theme.colors.textSecondary}
                  style={[
                    styles.nameInput,
                    {
                      borderColor: theme.colors.textSecondary,
                      backgroundColor: theme.colors.cardBackground,
                      color: theme.colors.text,
                    }
                  ]}
                />
              </Box>

              <Box marginTop="m">
                <Text variant="subheader" marginBottom="s">How We Met</Text>
                <TouchableOpacity
                  onPress={() => onShowHowWeMetPicker(true)}
                  style={[
                    styles.howWeMetButton,
                    {
                      borderColor: theme.colors.textSecondary,
                      backgroundColor: theme.colors.cardBackground,
                    }
                  ]}
                >
                  <Text color={howWeMet ? "text" : "textSecondary"}>
                    {howWeMet || "Select how you met..."}
                  </Text>
                </TouchableOpacity>
              </Box>

              <Box marginTop="m" flexDirection="row" gap="m">
                <Box flex={1}>
                  <Text variant="subheader" marginBottom="s">Age</Text>
                  <TextInput
                    value={age}
                    onChangeText={onAgeChange}
                    placeholder="Enter age"
                    keyboardType="numeric"
                    placeholderTextColor={theme.colors.textSecondary}
                    style={[
                      styles.nameInput,
                      {
                        borderColor: theme.colors.textSecondary,
                        backgroundColor: theme.colors.cardBackground,
                        color: theme.colors.text,
                      }
                    ]}
                  />
                </Box>
                <Box flex={1}>
                  <Text variant="subheader" marginBottom="s">Height</Text>
                  <TextInput
                    value={height}
                    onChangeText={onHeightChange}
                    placeholder="Height (e.g. 5'10)"
                    placeholderTextColor={theme.colors.textSecondary}
                    style={[
                      styles.nameInput,
                      {
                        borderColor: theme.colors.textSecondary,
                        backgroundColor: theme.colors.cardBackground,
                        color: theme.colors.text,
                      }
                    ]}
                  />
                </Box>
              </Box>

              <Box marginTop="l">
                <Text variant="subheader" marginBottom="s">Flags</Text>
                <FlagSelector
                  selectedFlags={flags}
                  onToggleFlag={onFlagToggle}
                />
              </Box>

              <Box marginTop="l">
                <Text variant="subheader" marginBottom="s">Ratings</Text>
                <Box>
                  {RATING_CATEGORIES.map((category) => (
                    <RatingSelector
                      key={category.id}
                      category={category.id}
                      value={ratings[category.id] || 0}
                      onChange={(value) => onRatingChange(category.id, value)}
                    />
                  ))}
                </Box>
              </Box>

              <Box marginTop="l">
                <Text variant="subheader" marginBottom="s">Notes</Text>
                <TextInput
                  ref={notesInputRef}
                  value={notes}
                  onChangeText={onNotesChange}
                  placeholder="Enter notes"
                  multiline
                  numberOfLines={4}
                  onFocus={handleNotesFocus}
                  placeholderTextColor={theme.colors.textSecondary}
                  style={[
                    styles.notesInput,
                    {
                      borderColor: theme.colors.textSecondary,
                      backgroundColor: theme.colors.cardBackground,
                      color: theme.colors.text,
                    }
                  ]}
                />
              </Box>
            </Animated.View>
          </ScrollView>

          <Box
            padding="m"
            backgroundColor="background"
            borderTopWidth={1}
            borderTopColor="cardBackground"
            style={{
              borderTopColor: theme.colors.cardBackground,
              backgroundColor: theme.colors.background,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {children}
          </Box>

          {showEmojiPicker && (
            <EmojiPicker
              isVisible={showEmojiPicker}
              onSelect={onEmojiChange}
              onClose={() => onShowEmojiPicker(false)}
            />
          )}

          {showHowWeMetPicker && (
            <HowWeMetPicker
              isVisible={showHowWeMetPicker}
              onClose={() => onShowHowWeMetPicker(false)}
              selectedOption={howWeMet}
              onSelect={(option) => {
                onHowWeMetChange(option);
                onShowHowWeMetPicker(false);
              }}
            />
          )}
        </Box>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  emojiButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
  },
  emoji: {
    fontSize: 48,
  },
  nameInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  howWeMetButton: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  notesInput: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  actionSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
});