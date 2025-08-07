import React, { useState, useCallback } from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Screen } from '@/components/base/Screen';
import { Box, Text } from '@/components/base/ThemeComponents';
import { useRoster } from '@/context/RosterContext';
import { DraggableRosterList } from '@/components/roster/DraggableRosterList';
import { EmptyRosterState } from '@/components/roster/EmptyRosterState';
import { FilterBar } from '@/components/roster/FilterBar';
import { useNavigation } from '@react-navigation/native';
import type { MainStackNavigationProp } from '@/types/navigation';
import { DragEndParams } from 'react-native-draggable-flatlist';
import { Entry } from '@/types/roster';

type NavigationProp = MainStackNavigationProp;

const RosterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { entries, updateEntry, isLoading } = useRoster();
  const [sortBy, setSortBy] = useState<string>('custom');
  const [searchText, setSearchText] = useState('');

  const handleAddEntry = useCallback(() => {
    navigation.navigate('NewEntry');
  }, [navigation]);

  const handleEntryPress = useCallback((id: string) => {
    navigation.navigate('EntryDetail', { id });
  }, [navigation]);

  const handleDragEnd = useCallback((params: DragEndParams<Entry>) => {
    params.data.forEach((entry, index) => {
      updateEntry(entry.id, { order: index });
    });
  }, [updateEntry]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <Screen>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text variant="body" color="textSecondary" marginTop="m">
            Loading roster...
          </Text>
        </Box>
      </Screen>
    );
  }

  // Apply filtering - now only search
  const filteredEntries = entries.filter(entry => {
    // Apply text search
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const nameMatch = entry.name?.toLowerCase().includes(searchLower);
      const notesMatch = entry.notes?.toLowerCase().includes(searchLower);
      const emojiMatch = entry.emoji?.includes(searchLower);

      if (!(nameMatch || notesMatch || emojiMatch)) {
        return false;
      }
    }

    return true;
  });

  // Apply sorting
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortBy === 'custom') {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return 0;
    }

    if (sortBy === 'date_newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (sortBy === 'date_oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    if (sortBy === 'name_az') {
      return ((a.name || '').toLowerCase()).localeCompare((b.name || '').toLowerCase());
    }

    if (sortBy === 'name_za') {
      return ((b.name || '').toLowerCase()).localeCompare((a.name || '').toLowerCase());
    }

    // Rating sorts
    const aRating = Object.values(a.ratings).reduce((sum, rating) => sum + rating, 0) /
                   (Object.keys(a.ratings).length || 1);
    const bRating = Object.values(b.ratings).reduce((sum, rating) => sum + rating, 0) /
                   (Object.keys(b.ratings).length || 1);

    if (sortBy === 'rating_highest') {
      return bRating - aRating;
    }

    if (sortBy === 'rating_lowest') {
      return aRating - bRating;
    }

    return 0;
  });

  const renderEmptyState = () => {
    if (entries.length === 0) {
      return <EmptyRosterState onAddPress={handleAddEntry} />;
    }

    if (filteredEntries.length === 0) {
      return (
        <Box
          flex={1}
          justifyContent="flex-start"
          alignItems="center"
          padding="l"
          paddingTop="xl"
        >
          <Text variant="body" color="textSecondary" textAlign="center">
            No matches
          </Text>
          <TouchableOpacity
            onPress={handleClearSearch}
            style={{ marginTop: 16 }}
          >
            <Text color="primary">Clear Search</Text>
          </TouchableOpacity>
        </Box>
      );
    }

    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen>
        <Box padding="l">
          <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="l">
            <Text variant="header" color="text">
              Roster
            </Text>
            <TouchableOpacity onPress={handleAddEntry}>
              <Box
                backgroundColor="primary"
                paddingHorizontal="m"
                paddingVertical="s"
                borderRadius="xl"
              >
                <Text variant="caption" color="white">
                  + Add
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSearch={handleSearchChange}
            searchText={searchText}
          />
        </Box>

        {renderEmptyState() || (
          <Box style={{ flexGrow: 1, minHeight: 0 }}>
            <DraggableRosterList
              entries={sortedEntries}
              onDragEnd={handleDragEnd}
              onEntryPress={handleEntryPress}
            />
          </Box>
        )}
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default RosterScreen;