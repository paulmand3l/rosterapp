import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, Text } from '@/components/base';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entry } from '@/types/roster';
import { EntryForm } from '@/components/entry/EntryForm';
import { ROSTER_LABELS } from '@/constants/entry';
import { useRoster } from '@/context/RosterContext';
import { Screen } from '@/components/base/Screen';

export const EntryDetailScreen: React.FC = () => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const route = useRoute();
  const { entries, updateEntry, deleteEntry, isLoading } = useRoster();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHowWeMetPicker, setShowHowWeMetPicker] = useState(false);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('👤');
  const [howWeMet, setHowWeMet] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [flags, setFlags] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');
  const [randomLabel, setRandomLabel] = useState(ROSTER_LABELS[0]);

  const id = (route.params as { id: string })?.id;
  const entry = entries.find(e => e.id === id);

  useEffect(() => {
    if (entry) {
      setName(entry.name || '');
      setEmoji(entry.emoji || '👤');
      setHowWeMet(entry.howWeMet || '');
      setAge(entry.age?.toString() || '');
      setHeight(entry.height || '');
      setFlags(entry.flags || []);
      setRatings(entry.ratings || {});
      setNotes(entry.notes || '');
    }
    const randomIndex = Math.floor(Math.random() * ROSTER_LABELS.length);
    setRandomLabel(ROSTER_LABELS[randomIndex]);
  }, [entry]);

  const handleSave = async () => {
    if (!entry) return;
    await updateEntry(entry.id, {
      ...entry,
      name,
      emoji,
      howWeMet,
      age: age ? parseInt(age) : undefined,
      height: height.trim() || undefined,
      flags,
      ratings,
      notes: notes.trim(),
    });
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (!entry) return;
    await deleteEntry(entry.id);
    navigation.goBack();
  };

  // Show loading state
  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="body" color="textSecondary" marginTop="m">
          Loading entry...
        </Text>
      </Box>
    );
  }

  if (!entry) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Entry not found</Text>
      </Box>
    );
  }

  return (
    <Screen>
      <EntryForm
        emoji={emoji}
        name={name}
        howWeMet={howWeMet}
        age={age}
        height={height}
        flags={flags}
        ratings={ratings}
        notes={notes}
        showEmojiPicker={showEmojiPicker}
        showHowWeMetPicker={showHowWeMetPicker}
        onEmojiChange={setEmoji}
        onNameChange={setName}
        onHowWeMetChange={setHowWeMet}
        onAgeChange={setAge}
        onHeightChange={setHeight}
        onFlagToggle={(flag) => {
          setFlags(prev =>
            prev.includes(flag)
              ? prev.filter(f => f !== flag)
              : [...prev, flag]
          );
        }}
        onRatingChange={(category, value) => {
          setRatings(prev => ({
            ...prev,
            [category]: value
          }));
        }}
        onNotesChange={setNotes}
        onShowEmojiPicker={setShowEmojiPicker}
        onShowHowWeMetPicker={setShowHowWeMetPicker}
        headerTitle={name || randomLabel}
        onCancel={handleCancel}
        onDelete={handleDelete}
        entryName={name || "Unnamed"}
      >
        <Box flexDirection="row" gap="m">
          <TouchableOpacity
            onPress={handleCancel}
            style={[
              styles.button,
              {
                flex: 1,
                backgroundColor: 'transparent',
                borderWidth: 0,
              }
            ]}
          >
            <Text color="textSecondary">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSave}
            style={[
              styles.button,
              {
                flex: 1,
                backgroundColor: theme.colors.primary,
              }
            ]}
          >
            <Text style={{ color: 'white' }}>Save</Text>
          </TouchableOpacity>
        </Box>
      </EntryForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EntryDetailScreen;