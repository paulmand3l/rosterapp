import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View, Platform } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
  DragEndParams
} from 'react-native-draggable-flatlist';
import { Entry } from '@/types/roster';
import { RosterCard } from './RosterCard';

interface DraggableRosterListProps {
  entries: Entry[];
  onDragEnd: (params: DragEndParams<Entry>) => void;
  onEntryPress: (id: string) => void;
}

export const DraggableRosterList: React.FC<DraggableRosterListProps> = ({
  entries,
  onDragEnd,
  onEntryPress,
}) => {
  const wiggleAnimations = useRef<{ [key: string]: Animated.Value }>({});

  // Initialize animation values for all entries
  useEffect(() => {
    entries.forEach(entry => {
      if (!wiggleAnimations.current[entry.id]) {
        wiggleAnimations.current[entry.id] = new Animated.Value(0);
      }
    });
  }, [entries]);

  const startWiggle = (id: string) => {
    if (!wiggleAnimations.current[id]) {
      wiggleAnimations.current[id] = new Animated.Value(0);
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(wiggleAnimations.current[id], {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(wiggleAnimations.current[id], {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(wiggleAnimations.current[id], {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopWiggle = (id: string) => {
    if (wiggleAnimations.current[id]) {
      wiggleAnimations.current[id].stopAnimation();
      wiggleAnimations.current[id] = new Animated.Value(0);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Entry>) => {
    const wiggle = wiggleAnimations.current[item.id]?.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['-2deg', '0deg', '2deg'],
    }) || '0deg';

    return (
      <ScaleDecorator>
        <Animated.View style={{ transform: [{ rotate: wiggle }] }}>
          <TouchableOpacity
            onLongPress={() => {
              startWiggle(item.id);
              drag();
            }}
            onPressOut={() => stopWiggle(item.id)}
            disabled={isActive}
            style={[
              styles.cardContainer,
              { opacity: isActive ? 0.5 : 1 }
            ]}
            delayLongPress={200}
          >
            <RosterCard
              entry={item}
              onPress={() => onEntryPress(item.id)}
            />
          </TouchableOpacity>
        </Animated.View>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={entries}
        onDragEnd={onDragEnd}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    flexGrow: 1,
  },
  cardContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
});