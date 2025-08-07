import React, { ReactNode } from 'react';
import { Box } from './ThemeComponents';
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme/themes';

export interface ScreenProps {
  children: ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
}) => {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: theme.colors.background }
    ]}>
      <Box
        bg="background"
        flex={1}
      >
        {children}
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});