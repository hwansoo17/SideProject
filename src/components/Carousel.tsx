import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';
import CarouselItem from './CarouselItem';
import AddNewCardItem from './AddNewCardItem';

const screenWidth = Dimensions.get('window').width;

type CarouselProps = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  data: any[];
  isFlipped: boolean;
};

const Carousel: React.FC<CarouselProps> = ({currentIndex, setCurrentIndex, data, isFlipped}) => {

  const scrollX = useSharedValue(0);
  const scrollWidth = screenWidth * 0.7 - screenWidth * 0.1;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
    const index = Math.round(
      scrollX.value / scrollWidth // 중앙 카드 인덱스 계산
    );
    runOnJS(setCurrentIndex)(index);
  });

  

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={scrollWidth}
      snapToAlignment="start"
      decelerationRate="fast"
      scrollEventThrottle={16}
      bounces={false}
      onScroll={scrollHandler}
    >
      <View
        style={{
          width: (screenWidth - screenWidth * 0.7) / 2 + screenWidth * 0.05,
        }}
      />
      {data.map((item, index) => (
        <CarouselItem
          scrollWidth={scrollWidth}
          key={item.id-1}
          item={item}
          scrollX={scrollX}
          currentIndex={currentIndex}
          index={index}
          isFlipped={isFlipped && currentIndex === index}
        />
      ))}
      <AddNewCardItem
        scrollWidth={scrollWidth}
        data={data}
        scrollX={scrollX}
        currentIndex={currentIndex}
        isFlipped={isFlipped}
      />
      <View
        style={{
          width: (screenWidth - screenWidth * 0.7) / 2 + screenWidth * 0.05,
        }}
      />
    </Animated.ScrollView>
  );
}

export default Carousel;