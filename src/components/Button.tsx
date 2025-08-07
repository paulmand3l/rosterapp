import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Theme } from '../theme/themes';
import Text from './Text';
import Box from './Box';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  onPress,
  label,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
}: ButtonProps) => {
  const theme = useTheme<Theme>();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.textLight;
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.text;
    switch (variant) {
      case 'outline':
        return theme.colors.primary;
      default:
        return theme.colors.textLight;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'outline' ? theme.colors.primary : 'transparent',
        },
      ]}
    >
      <Animated.View
        entering={FadeIn}
        style={styles.content}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <>
            {icon && <Box marginRight="s">{icon}</Box>}
            <Text
              variant="body"
              style={[styles.label, { color: getTextColor() }]}
            >
              {label}
            </Text>
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Button;