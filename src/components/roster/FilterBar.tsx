import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import { Box, Text } from '@/components/base';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import { Ionicons } from '@expo/vector-icons';
import { SortModal, SortOption } from './SortModal';

interface FilterBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  onSearch: (text: string) => void;
  searchText: string;
}

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
};

export const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  onSortChange,
  onSearch,
  searchText,
}) => {
  const theme = useTheme<Theme>();
  const [showSortModal, setShowSortModal] = useState(false);

  const sortOptions: SortOption[] = [
    { id: 'custom', label: 'Custom Order', value: 'custom', icon: 'reorder-four-outline' },
    { id: 'date_newest', label: 'Newest First', value: 'date_newest', icon: 'time-outline' },
    { id: 'date_oldest', label: 'Oldest First', value: 'date_oldest', icon: 'time-outline' },
    { id: 'rating_highest', label: 'Highest Rated', value: 'rating_highest', icon: 'star-outline' },
    { id: 'rating_lowest', label: 'Lowest Rated', value: 'rating_lowest', icon: 'star-outline' },
    { id: 'name_az', label: 'Name (A-Z)', value: 'name_az', icon: 'text-outline' },
    { id: 'name_za', label: 'Name (Z-A)', value: 'name_za', icon: 'text-outline' },
  ];

  // Get display name for the current sort option
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Sort';
  };

  // Get the numeric border radius from theme for styling
  const mediumBorderRadius = theme.borderRadii.m;

  return (
    <Box width="100%">
      {/* Search Bar with Sort Button */}
      <Box
        flexDirection="row"
        alignItems="center"
      >
        <Box
          flex={1}
          flexDirection="row"
          alignItems="center"
          backgroundColor="cardBackground"
          borderRadius="m"
          paddingHorizontal="m"
          marginRight="s"
          height={44}
          style={shadowStyle}
        >
          <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} />
          <TextInput
            placeholder="Search name, notes..."
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholderTextColor={theme.colors.textSecondary}
            value={searchText}
            onChangeText={onSearch}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => onSearch('')}>
              <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </Box>

        <TouchableOpacity
          style={[
            styles.sortButton,
            shadowStyle,
            {
              backgroundColor: theme.colors.cardBackground,
              borderRadius: mediumBorderRadius,
            }
          ]}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="swap-vertical-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </Box>

      {/* Sort Modal */}
      <SortModal
        isVisible={showSortModal}
        onClose={() => setShowSortModal(false)}
        sortOptions={sortOptions}
        selectedSort={sortBy}
        onSelect={onSortChange}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 8,
    fontSize: 16,
    height: 44,
  },
  sortButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  }
});