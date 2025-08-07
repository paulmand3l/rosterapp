import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Box, Text } from '@/components/base';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export type FilterOption = {
  id: string;
  label: string;
  value: string;
  icon: string;
  selected: boolean;
};

export type FilterCategory = {
  id: string;
  title: string;
  options: FilterOption[];
  multiSelect: boolean;
};

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  filterCategories: FilterCategory[];
  activeFilters: Record<string, string[]>;
  onApplyFilters: (filters: Record<string, string[]>) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  filterCategories,
  activeFilters,
  onApplyFilters,
  onResetFilters,
}) => {
  const theme = useTheme<Theme>();
  const { height: screenHeight } = Dimensions.get('window');
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>(activeFilters);

  // Update tempFilters when activeFilters change
  useEffect(() => {
    if (isVisible) {
      setTempFilters({...activeFilters});
    }
  }, [isVisible, activeFilters]);

  const handleFilterSelect = (categoryId: string, optionValue: string, multiSelect: boolean) => {
    setTempFilters(prev => {
      const newFilters = { ...prev };

      if (!newFilters[categoryId]) {
        newFilters[categoryId] = [];
      }

      if (multiSelect) {
        // Toggle selection for multi-select
        if (newFilters[categoryId].includes(optionValue)) {
          newFilters[categoryId] = newFilters[categoryId].filter(v => v !== optionValue);
        } else {
          newFilters[categoryId] = [...newFilters[categoryId], optionValue];
        }
      } else {
        // Replace selection for single-select
        newFilters[categoryId] = [optionValue];
      }

      return newFilters;
    });
  };

  const applyFilters = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const resetFilters = () => {
    onResetFilters();
    onClose();
  };

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
        backgroundColor="background"
        borderRadius="l"
        overflow="hidden"
        width="100%"
        maxHeight={screenHeight * 0.8}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="cardBackground"
          paddingHorizontal="m"
          paddingVertical="m"
          borderBottomWidth={1}
          borderBottomColor="cardBackground"
        >
          <Text variant="subheader">Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Text variant="body" color="primary">Cancel</Text>
          </TouchableOpacity>
        </Box>

        <FlatList
          data={filterCategories}
          keyExtractor={(item) => item.id}
          renderItem={({ item: category }) => (
            <Box
              paddingHorizontal="m"
              paddingTop="m"
              paddingBottom="s"
            >
              <Text
                variant="body"
                color="textSecondary"
                marginBottom="s"
              >
                {category.title}
              </Text>

              <Box flexDirection="row" flexWrap="wrap">
                {category.options.map((option) => {
                  const isSelected = tempFilters[category.id]?.includes(option.value) || false;

                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.filterOption,
                        {
                          backgroundColor: isSelected ? theme.colors.primary : theme.colors.cardBackground,
                          borderWidth: isSelected ? 0 : 1,
                          borderColor: isSelected ? 'transparent' : theme.colors.cardBackground,
                        }
                      ]}
                      onPress={() => handleFilterSelect(category.id, option.value, category.multiSelect)}
                    >
                      <Ionicons
                        name={option.icon as any}
                        size={16}
                        color={isSelected ? 'white' : theme.colors.text}
                      />
                      <Text
                        variant="caption"
                        marginLeft="xs"
                        color={isSelected ? 'white' : 'text'}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </Box>

              <Box
                height={1}
                backgroundColor="cardBackground"
                marginTop="m"
              />
            </Box>
          )}
          style={{ maxHeight: screenHeight * 0.6 }}
          contentContainerStyle={{ paddingBottom: 8 }}
        />

        <Box
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor="cardBackground"
          paddingHorizontal="m"
          paddingVertical="m"
          borderTopWidth={1}
          borderTopColor="cardBackground"
        >
          <TouchableOpacity
            style={[styles.filterButton, {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: theme.colors.primary
            }]}
            onPress={resetFilters}
          >
            <Text color="primary">Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: theme.colors.primary }]}
            onPress={applyFilters}
          >
            <Text color="white">Apply</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 16,
    justifyContent: 'flex-end',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
});