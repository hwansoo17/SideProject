import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Touchable,
  Linking,
} from 'react-native';

import useAuthStore from '../../store/useAuthStore';
import Carousel from '../../components/Carousel';
import ShareButton from '../../components/ShareButton';
import { authApi } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { fetchMyCardList } from '../../api/myCard';
import { colors, textStyles } from '../../styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import useCardList from '../../hooks/queries/useCardList';
import StorageStatusBar from '../../components/StorageStatusBar';
import useMyCardList from '../../hooks/queries/useMyCardList';
import useOriginStore from '../../store/useOriginStore';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface CarouselItem {
  id: number;
  name: string;
  corporation: string;
  title: string;
  tel: string;
  email: string;
  links: string[];
  logoImg: string;
  bgImg: string;
  brColor: string;
  gradient: string;
  realCardImg: string;
  background: string;
  }

const HomeMain: React.FC = () => {
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {setOrigin} = useOriginStore();

  const {isLoading, isError, data: myCardList = [], error} = useMyCardList();
  const { data: cardList = [] } = useCardList(true);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const userdata = useAuthStore((state) => state.data);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    setOrigin('HomeMain');
  }, []);

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <Carousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} data={myCardList} isFlipped={isFlipped} />
      {currentIndex !== myCardList.length &&
      <View style={{position:'absolute', bottom: (screenHeight-screenWidth-73)/2-24, alignSelf:'center'}}>
        <ShareButton handleFlip={handleFlip} />
      </View>}
      {/* <Button title="로그아웃" onPress={() => { logout(); console.log(isLoggedIn); }} /> */}
      <View style={{position:'absolute', paddingHorizontal:20, paddingVertical:10, gap:12, width:'100%', bottom:50}}>
        <StorageStatusBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
});

export default HomeMain;
