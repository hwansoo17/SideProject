import React from 'react';
import {
  View,
  ScrollView,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CarouselItem from './CarouselItem';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselProps {
  scrollX: Animated.Value;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const data = [
  { id: 0, title: 'Item 1', color: '#FFB2B2' },
  { id: 1, title: 'Item 2', color: '#0053F5' },
  { id: 2, title: 'Item 3', color: '#42FFC6' },
  { id: 3, title: 'Item 4', color: 'rgb(4, 0, 187)' },
  { id: 4, title: 'Item 5', color: 'rgb(255, 122, 0)' },
];

const Carousel: React.FC<CarouselProps> = ({
  scrollX,
  currentIndex,
  setCurrentIndex,
}) => {
  const scrollWidth = screenWidth * 0.6 - screenWidth * 0.2;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / scrollWidth);
    setCurrentIndex(index);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={scrollWidth}
      snapToAlignment="start"
      decelerationRate="fast"
      scrollEventThrottle={16}
      bounces={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false, listener: handleScroll }
      )}
    >
      <View style={styles.spacer} />
      {data.map((item) => (
        <CarouselItem
          key={item.id}
          item={item}
          scrollX={scrollX}
          currentIndex={currentIndex}
        />
      ))}
      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spacer: {
    width: (screenWidth - screenWidth * 0.6) / 2 + screenWidth * 0.1,
  },
});

export default Carousel;
