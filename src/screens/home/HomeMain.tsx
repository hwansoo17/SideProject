import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthStore from '../../store/useAuthStore';
import Carousel from '../../components/Carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeMain: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} />
      <Carousel
        scrollX={scrollX}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <Button
        title="로그아웃"
        onPress={() => {
          logout();
          console.log(isLoggedIn);
        }}
      />
      <View style={styles.footer} />
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
  header: {
    height: screenHeight * 0.17,
  },
  footer: {
    height: 73,
  },
});

export default HomeMain;
