import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';

import useAuthStore from '../../store/useAuthStore';
import Carousel from '../../components/Carousel';
import ShareButton from '../../components/ShareButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface CarouselItem {
  id: number;
  title: string;
  color: string;
  backColor: string;
}

const data: CarouselItem[] = [
  { id: 0, title: 'Item 1', color: '#42FFC6', backColor: '#eee' },
  { id: 1, title: 'Item 2', color: '#FFB2B2', backColor: '#eee' },
  { id: 2, title: 'Item 3', color: '#fff', backColor: '#eee' },
  { id: 3, title: 'Item 4', color: '#0053F5', backColor: '#eee' },
  { id: 4, title: 'Item 5', color: '#FF9D2A', backColor: '#eee' },
];

const HomeMain: React.FC = () => {
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const userdata = useAuthStore((state) => state.data);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);


  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <Carousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} data={data} isFlipped={isFlipped} />
      {currentIndex !== data.length &&
      <View style={{position:'absolute', bottom: (screenHeight-screenWidth-73)/2-24, alignSelf:'center'}}>
        <ShareButton handleFlip={handleFlip} />
      </View>}
      {/* <Button title="로그아웃" onPress={() => { logout(); console.log(isLoggedIn); }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
  },
});

export default HomeMain;
