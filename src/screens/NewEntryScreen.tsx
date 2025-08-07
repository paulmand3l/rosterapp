import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { Box } from '@/components/base';
import { useNavigation } from '@react-navigation/native';
import type { MainStackNavigationProp } from '@/types/navigation';
import { useRoster } from '@/context/RosterContext';
import type { Entry } from '@/types/roster';
import { EntryForm } from '@/components/entry/EntryForm';
import { ROSTER_LABELS } from '@/constants/entry';
import { EMOJIS } from '@/components/EmojiPicker';
import { Screen } from '@/components/base';

type NavigationProp = MainStackNavigationProp;

const NewEntryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addEntry } = useRoster();
  const [emoji, setEmoji] = useState(() => EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
  const [name, setName] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHowWeMetPicker, setShowHowWeMetPicker] = useState(false);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [howWeMet, setHowWeMet] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(() => {
    console.log('Save button pressed');

    if (isSaving) {
      console.log('Already saving, ignoring duplicate press');
      return;
    }

    setIsSaving(true);

    try {
      console.log('Creating new entry object');
      const newEntry: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'> = {
        emoji,
        name: name.trim(),
        ratings: Object.keys(ratings).length > 0 ? ratings : { overall: 5 }, // Default rating
        dates: [],
        notes: notes.trim(),
        flags: selectedFlags,
        howWeMet: howWeMet.trim(),
        age: age ? parseInt(age) : undefined,
        height: height.trim() || undefined,
      };

      console.log('Calling addEntry');

      // Use a Promise to handle the async operation
      Promise.resolve()
        .then(() => addEntry(newEntry))
        .then(() => {
          console.log('Entry added successfully, navigating back');
          navigation.goBack();
        })
        .catch((error) => {
          console.error('Error saving entry:', error);
          Alert.alert('Error', 'Failed to save entry. Please try again.');
        })
        .finally(() => {
          setIsSaving(false);
        });
    } catch (error) {
      console.error('Unexpected error in handleSave:', error);
      Alert.alert('Error', 'An unexpected error occurred');
      setIsSaving(false);
    }
  }, [emoji, name, selectedFlags, ratings, howWeMet, age, height, notes, addEntry, navigation, isSaving]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleRatingChange = (category: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleFlagToggle = (flag: string) => {
    setSelectedFlags(prev =>
      prev.includes(flag)
        ? prev.filter(f => f !== flag)
        : [...prev, flag]
    );
  };

  const randomLabel = ROSTER_LABELS[Math.floor(Math.random() * ROSTER_LABELS.length)];

  return (
    <Screen>
      <EntryForm
        emoji={emoji}
        name={name}
        howWeMet={howWeMet}
        age={age}
        height={height}
        flags={selectedFlags}
        ratings={ratings}
        notes={notes}
        showEmojiPicker={showEmojiPicker}
        showHowWeMetPicker={showHowWeMetPicker}
        onEmojiChange={setEmoji}
        onNameChange={setName}
        onHowWeMetChange={setHowWeMet}
        onAgeChange={setAge}
        onHeightChange={setHeight}
        onFlagToggle={handleFlagToggle}
        onRatingChange={handleRatingChange}
        onNotesChange={setNotes}
        onShowEmojiPicker={setShowEmojiPicker}
        onShowHowWeMetPicker={setShowHowWeMetPicker}
        headerTitle={`New ${randomLabel}`}
        onCancel={handleCancel}
      >
        <TouchableOpacity onPress={handleSave} disabled={isSaving}>
          <Box
            backgroundColor="primary"
            padding="m"
            borderRadius="s"
            alignItems="center"
            opacity={isSaving ? 0.7 : 1}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>
              {isSaving ? 'Saving...' : 'Save'}
            </Text>
          </Box>
        </TouchableOpacity>
      </EntryForm>
    </Screen>
  );
};

export default NewEntryScreen;