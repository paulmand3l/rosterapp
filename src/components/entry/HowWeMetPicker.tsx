import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Box, Text } from '@/components/base';
import { HOW_WE_MET_OPTIONS } from '@/constants/entry';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import Modal from 'react-native-modal';
import Animated, { FadeIn } from 'react-native-reanimated';

interface HowWeMetPickerProps {
  isVisible: boolean;
  onClose: () => void;
  selectedOption: string;
  onSelect: (option: string) => void;
}

export const HowWeMetPicker: React.FC<HowWeMetPickerProps> = ({
  isVisible,
  onClose,
  selectedOption,
  onSelect,
}) => {
  const theme = useTheme<Theme>();
  const { height: screenHeight } = Dimensions.get('window');

  const handleSelect = (option: string) => {
    onSelect(option);
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
          <Text variant="subheader">How We Met</Text>
          <TouchableOpacity onPress={onClose}>
            <Text variant="body" color="primary">Done</Text>
          </TouchableOpacity>
        </Box>

        <ScrollView>
          {HOW_WE_MET_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleSelect(option)}
              style={[
                styles.option,
                selectedOption === option && styles.selectedOption
              ]}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
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
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
});