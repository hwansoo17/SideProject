import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  Button,
} from 'react-native';
import useAuthStore from '../../store/useAuthStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');
const screenHeight = Dimensions.get('window').height;

interface CarouselItem {
  id: number;
  title: string;
  color: string;
}

const data: CarouselItem[] = [
  { id: 0, title: 'Item 1', color: '#FFB2B2' },
  { id: 1, title: 'Item 2', color: '#0053F5' },
  { id: 2, title: 'Item 3', color: '#42FFC6' },
  { id: 3, title: 'Item 4', color: 'rgb(4, 0, 187)' },
  { id: 4, title: 'Item 5', color: 'rgb(255, 122, 0)' },
];

const HomeMain: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollWidth = screenWidth * 0.6 - screenWidth * 0.2;
  const logout = useAuthStore((state) => state.logout);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(
      contentOffsetX / (screenWidth * 0.6 - screenWidth * 0.2)
    );
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: screenHeight * 0.17 }} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth * 0.6 - screenWidth * 0.2}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
      >
        <View
          style={{
            width: (screenWidth - screenWidth * 0.6) / 2 + screenWidth * 0.1,
          }}
        />
        {data.map((item) => {
          const inputRange = [
            (item.id - 1) * (screenWidth * 0.6 - screenWidth * 0.2),
            item.id * (screenWidth * 0.6 - screenWidth * 0.2),
            (item.id + 1) * (screenWidth * 0.6 - screenWidth * 0.2),
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
              (item.id - 1) * (screenWidth * 0.6 - screenWidth * 0.2),
              (item.id - 0.5) * (screenWidth * 0.6 - screenWidth * 0.2),
              item.id * (screenWidth * 0.6 - screenWidth * 0.2),
            ],
            outputRange: [-screenWidth * 0.1, 30, -screenWidth * 0.1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.card,
                {
                  transform: [{ scale }],
                  marginRight: item.id === currentIndex ? marginRight : undefined, // Use undefined instead of false
                  marginLeft: item.id === currentIndex ? marginLeft : undefined, // Use undefined instead of false
                  zIndex: item.id === currentIndex ? 2 : 0,
                  backgroundColor: item.color,
                  elevation: 10,
                  overflow: 'hidden',
                  position: 'relative',
                },
              ]}
            >
              <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                <View style={{ flex: 7 }} />
                <View
                  style={{ flex: 3, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                />
              </View>
            </Animated.View>
          );
        })}
        <View
          style={{
            width: (screenWidth - screenWidth * 0.6) / 2 + screenWidth * 0.1,
          }}
        />
      </ScrollView>
      <Button title="로그아웃" onPress={() => {logout}} />
      <View style={{ height: 73 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
  },
  card: {
    backgroundColor: 'blue',
    borderRadius: 10,
    height: screenHeight * 0.4,
    width: screenWidth * 0.6,
    marginHorizontal: -screenWidth * 0.1,
  },
});

export default HomeMain;