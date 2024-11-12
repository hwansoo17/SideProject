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
import { authApi } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { fetchMyCardList } from '../../api/myCard';
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
      <Carousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} data={myCardList} isFlipped={isFlipped} />
      {currentIndex !== myCardList.length &&
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
