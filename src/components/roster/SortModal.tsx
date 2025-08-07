import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Box, Text } from '@/components/base';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export type SortOption = {
  id: string;
  label: string;
  value: string;
  icon: string;
};

interface SortModalProps {
  isVisible: boolean;
  onClose: () => void;
  sortOptions: SortOption[];
  selectedSort: string;
  onSelect: (value: string) => void;
}

export const SortModal: React.FC<SortModalProps> = ({
  isVisible,
  onClose,
  sortOptions,
  selectedSort,
  onSelect,
}) => {
  const theme = useTheme<Theme>();
  const { height: screenHeight } = Dimensions.get('window');

  const handleSelect = (value: string) => {
    onSelect(value);
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
        maxHeight={screenHeight * 0.7}
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
          <Text variant="subheader">Sort By</Text>
          <TouchableOpacity onPress={onClose}>
            <Text variant="body" color="primary">Done</Text>
          </TouchableOpacity>
        </Box>

        <FlatList
          data={sortOptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.sortItem,
                {
                  backgroundColor: selectedSort === item.value ? theme.colors.cardBackground : 'transparent',
                  borderBottomColor: theme.colors.cardBackground
                }
              ]}
              onPress={() => handleSelect(item.value)}
            >
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={36}
                  height={36}
                  borderRadius="m"
                  backgroundColor={selectedSort === item.value ? "primary" : "cardBackground"}
                  alignItems="center"
                  justifyContent="center"
                  marginRight="s"
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={selectedSort === item.value ? "white" : theme.colors.text}
                  />
                </Box>
                <Text variant="body">{item.label}</Text>
              </Box>
              {selectedSort === item.value && (
                <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 16,
    justifyContent: 'flex-end',
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
});