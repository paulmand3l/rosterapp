import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Text } from '@/components/base';
import { UserProfile } from '@/types/models';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ProfileHeaderProps {
  userProfile: UserProfile | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userProfile }) => {
  return (
    <Animated.View entering={FadeIn}>
      <Box
        backgroundColor="cardBackground"
        padding="l"
        borderRadius="l"
        marginBottom="l"
        alignItems="center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>{userProfile?.avatar || '👤'}</Text>
        </View>
        <Text variant="header" marginVertical="s" style={{ fontWeight: '700' }}>
          {userProfile?.badge || 'Newbie'}
        </Text>
        <Box
          backgroundColor="primary"
          paddingHorizontal="m"
          paddingVertical="xs"
          borderRadius="full"
          marginTop="xs"
        >
          <Text variant="caption" color="textLight">
            {userProfile?.datingStyle || 'Not set'}
          </Text>
        </Box>
      </Box>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarEmoji: {
    fontSize: 70,
    lineHeight: 100,
    textAlign: 'center',
  },
});

export default ProfileHeader;