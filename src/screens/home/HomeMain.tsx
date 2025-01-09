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
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const WalletIcon = require('../../assets/icons/wallet.svg').default;


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

// const data: CarouselItem[] = [
//   { id: 0, name:'김수환', corporation:'회사', title:'직책', tel:'010-1234-5678', email:'playground99@ajou.ac.kr', links: ['', ''], logoImg:'https://www.google.com/logos/doodles/2024/paris-games-archery-day-2-6753651837110537-s.png', bgImg:'https://www.naver.com', brColor:'red', gradient:'#eee', realCardImg:'https://www.naver.com', background:'#eee' },
//   { id: 1, name:'김수환', corporation:'회사', title:'직책', tel:'010-1234-5678', email:'playground99@ajou.ac.kr', links: [], logoImg:'https://www.naver.com', bgImg:'https://www.naver.com', brColor:'green', gradient:'#eee', realCardImg:'https://www.naver.com', background:'#eee' },
//   { id: 2, name:'김수환', corporation:'회사', title:'직책', tel:'010-1234-5678', email:'playground99@ajou.ac.kr', links: [], logoImg:'https://www.naver.com', bgImg:'https://www.naver.com', brColor:'#eee', gradient:'#eee', realCardImg:'https://www.naver.com', background:'#eee' },
//   { id: 3, name:'김수환', corporation:'회사', title:'직책', tel:'010-1234-5678', email:'playground99@ajou.ac.kr', links: [], logoImg:'https://www.naver.com', bgImg:'https://www.naver.com', brColor:'#eee', gradient:'#eee', realCardImg:'https://www.naver.com', background:'#eee' },
//   { id: 4, name:'김수환', corporation:'회사', title:'직책', tel:'010-1234-5678', email:'playground99@ajou.ac.kr', links: [], logoImg:'https://www.naver.com', bgImg:'https://www.naver.com', brColor:'#eee', gradient:'#eee', realCardImg:'https://www.naver.com', background:'#eee' },
// ];

const HomeMain: React.FC = () => {
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [myCardList, setMyCardList] = useState<CarouselItem[]>([]);
  // const getMyCardList = async () => {
  //   const response = await authApi.get('/api/my_cards')
  //   if (response.status === 200) {
  //     console.log(response.data, 'mycardlist');
  //     setMyCardList(response.data);
  //   }
  // }
  // useEffect(() => {
  //   getMyCardList();
  // }, []);
  const {isLoading, isError, data: myCardList = [], error} = useQuery({queryKey:['myCards'], queryFn: fetchMyCardList});
  const { data: cardList = [] } = useCardList(true);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const userdata = useAuthStore((state) => state.data);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);


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
        <TouchableOpacity 
          style={{gap:12}}
          onPress={() => Linking.openURL('sideproject://storage')}
          >
          <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <WalletIcon />
              <View style={{width: 8}} />
              <Text style={[textStyles.SB1, {color: colors.White}]}>{cardList.length}</Text>
              <Text style={[textStyles.SB1, {color: colors.White}]}>/100</Text>
            </View>
            <View style={{borderRadius:100, paddingHorizontal:12, paddingVertical:2, backgroundColor:colors.Primary, borderWidth:1, borderColor: '#BBB0FF'}}>
              <Text style={[textStyles.M5, {color: colors.White}]}>FREE</Text>
            </View>
          </View>
          <View
            style={{
              height: 10,
              borderRadius: 100,
              backgroundColor: colors.G02,
              flexDirection: 'row',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 50/cardList.length == null ? 100 : cardList.length, y: 0}}
              colors={['#5539FF', '#D8D8FF']}
              style={{flex: cardList.length == null ? 100 : cardList.length, borderRadius: 100}}
            />
            <View style={{flex: 100-(cardList.length == null ? 100 : cardList.length)}} />
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems:'center', gap:16, justifyContent:'center'}}>
          <TouchableOpacity style={{padding:4}}>
            <Text style={[textStyles.M5, {color: colors.G10}]}>
              명함 등록
            </Text>
          </TouchableOpacity>
          <Text style={[textStyles.M5, {color: colors.G10}]}>
            {'|'}
          </Text> 
          <TouchableOpacity style={{padding:4}}>
            <Text style={[textStyles.M5, {color: colors.G10}]}>
              플랜 구독
            </Text> 
          </TouchableOpacity>
        </View>
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
