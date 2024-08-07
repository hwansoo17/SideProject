import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  SharedValue,
  withTiming,
  ReduceMotion
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselItemProps {
  item: {
    id: number;
    title: string;
    color: string;
    backColor: string; // Added backColor for the back of the card
  };
  scrollX: SharedValue<number>;
  currentIndex: number;
  index: number;
  isFlipped: boolean;
  scrollWidth: number;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  scrollX,
  currentIndex,
  index,
  isFlipped,
  scrollWidth,
}) => {
  const rotateY = useSharedValue(0);

  if (isFlipped) {
    rotateY.value = withTiming(180, { duration: 500, reduceMotion: ReduceMotion.Never }); // ReduceMotion.Never 기기 애니메이션 줄이기 설정 무시
  } else {
    rotateY.value = withTiming(0, { duration: 350, reduceMotion: ReduceMotion.Never }); // 뒤집히지 않은 상태일때 0도로 애니메이션 없이 돌리기
  }

  // Calculate input range for scaling and positioning
  const inputRange = [
    (item.id - 1) * scrollWidth,
    item.id * scrollWidth,
    (item.id + 1) * scrollWidth,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );

    const marginRight = interpolate(
      scrollX.value,
      [
        item.id * scrollWidth,
        (item.id + 0.5) * scrollWidth,
        (item.id + 1) * scrollWidth,
      ],
      [-screenWidth * 0.05, 50, -screenWidth * 0.05],
      Extrapolation.CLAMP
    );

    const marginLeft = interpolate(
      scrollX.value,
      [
        (item.id - 1) * scrollWidth,
        (item.id - 0.5) * scrollWidth,
        item.id * scrollWidth,
      ],
      [-screenWidth * 0.05, 50, -screenWidth * 0.05],
      Extrapolation.CLAMP
    );

    const zIndex = currentIndex === item.id ? 2 : 0;

    return {
      transform: [
        { scale },
        // { perspective: 1000 },
      ],
      marginRight: item.id === currentIndex ? marginRight : undefined,
      marginLeft: item.id === currentIndex ? marginLeft : undefined,
      zIndex,
    };
  });

  const frontCardAnimatedStyle = useAnimatedStyle(() => {
    const elevation = interpolate(
      rotateY.value,
      [0, 3, 177, 180],
      [10, 0, 0, 10],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ rotateY: `${rotateY.value}deg` }],
      elevation
    };
  });
  const backCardAnimatedStyle = useAnimatedStyle(() => {
    const elevation = interpolate(
      rotateY.value,
      [0, 3, 177, 180],
      [10, 0, 0, 10],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ rotateY: `${rotateY.value + 180}deg` }],
      elevation
    };
  });



  return (
    <Animated.View
      style={[
        styles.cardContainer,
        animatedStyle,
      ]}
    >
      <Animated.View style={[styles.front, frontCardAnimatedStyle, { backgroundColor: item.color }]}>
        <View style={{width: screenWidth * 0.7, height: screenWidth, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          <View style={{flex:7}}>
            <Text style={styles.text}>{item.title} - 앞면</Text>
          </View>
          <View style={{flex:3, backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>

          </View>
        </View>
      </Animated.View>
      <Animated.View style={[styles.back, backCardAnimatedStyle, { backgroundColor: item.backColor }]}>
        <View style={{width: screenWidth * 0.7, height: screenWidth, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          <Text style={styles.text}>{item.title} - 뒷면</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: screenWidth * 0.7,
    marginHorizontal: -screenWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  front: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    overflow: 'hidden',
  },
  back: {
    backfaceVisibility: 'hidden',
    transform: [{ rotateY: '180deg' }],
    borderRadius: 10,
    overflow: 'hidden'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CarouselItem;
