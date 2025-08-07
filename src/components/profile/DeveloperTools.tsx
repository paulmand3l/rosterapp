import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Box, Text, Button } from '@/components/base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/themes';
import { debugUtils } from '@/utils/debug';
import { storage } from '@/services/storage';

interface DeveloperToolsProps {}

const DeveloperTools: React.FC<DeveloperToolsProps> = () => {
  const theme = useTheme<Theme>();
  const [showDebug, setShowDebug] = useState(false);
  const [debugMessage, setDebugMessage] = useState<string | null>(null);

  const handleClearStorage = async () => {
    Alert.alert(
      "Clear Storage",
      "Are you sure you want to clear all app data? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            const result = await debugUtils.clearStorage();
            setDebugMessage(result.message || null);
            if (result.success) {
              // Reset onboarding state
              await storage.saveOnboardingCompleted(false);
              // Force a reload of the app
              const { RNRestart } = require('react-native-restart');
              RNRestart.Restart();
            }
          }
        }
      ]
    );
  };

  const handleViewStorageState = async () => {
    const result = await debugUtils.getStorageState();
    if (result.success) {
      Alert.alert(
        "Storage State",
        JSON.stringify(result.data, null, 2),
        [{ text: "OK" }]
      );
    } else {
      setDebugMessage(result.message);
    }
  };

  return (
    <Box marginTop="xl">
      <TouchableOpacity onPress={() => setShowDebug(!showDebug)}>
        <Box
          flexDirection="row"
          alignItems="center"
          backgroundColor="cardBackground"
          padding="m"
          borderRadius="l"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <MaterialCommunityIcons
            name={showDebug ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.colors.text}
          />
          <Text variant="subheader" marginLeft="s">
            Developer Tools
          </Text>
        </Box>
      </TouchableOpacity>

      {showDebug && (
        <Box
          backgroundColor="cardBackground"
          padding="m"
          borderRadius="l"
          marginTop="s"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Button
            variant="secondary"
            label="Clear Storage"
            onPress={handleClearStorage}
          />
          <Box marginTop="s">
            <Button
              variant="secondary"
              label="View Storage State"
              onPress={handleViewStorageState}
            />
          </Box>
          {debugMessage && (
            <Text
              variant="caption"
              color="textSecondary"
              marginTop="s"
            >
              {debugMessage}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DeveloperTools;