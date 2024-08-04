import React from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CarouselItemProps {
  item: {
    id: number;
    title: string;
    color: string;
  };
  scrollX: Animated.Value;
  currentIndex: number;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item, scrollX, currentIndex }) => {
  const scrollWidth = screenWidth * 0.6 - screenWidth * 0.2;

  const inputRange = [
    (item.id - 1) * scrollWidth,
    item.id * scrollWidth,
    (item.id + 1) * scrollWidth,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 0.8, 0.5],
    extrapolate: 'clamp',
  });

  const marginRight = scrollX.interpolate({
    inputRange: [
      item.id * scrollWidth,
      (item.id + 0.5) * scrollWidth,
      (item.id + 1) * scrollWidth,
    ],
    outputRange: [-screenWidth * 0.1, 30, -screenWidth * 0.1],
    extrapolate: 'clamp',
  });

  const marginLeft = scrollX.interpolate({
    inputRange: [
      (item.id - 1) * scrollWidth,
      (item.id - 0.5) * scrollWidth,
      item.id * scrollWidth,
    ],
    outputRange: [-screenWidth * 0.1, 30, -screenWidth * 0.1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ scale }],

          marginRight: item.id === currentIndex ? marginRight : undefined,
          marginLeft: item.id === currentIndex ? marginLeft : undefined,
          zIndex: item.id === currentIndex ? 2 : 0,
          backgroundColor: item.color,
        },
      ]}
    >
      <View style={styles.innerCard}>
        <View style={styles.topPart} />
        <View style={styles.bottomPart} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    height: screenHeight * 0.4,
    width: screenWidth * 0.6,
    marginHorizontal: -screenWidth * 0.1,
    elevation: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  innerCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  topPart: {
    flex: 7,
  },
  bottomPart: {
    flex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default CarouselItem;
