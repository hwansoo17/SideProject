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
import useOriginStore from '../../store/useOriginStore';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const WalletIcon = require('../../assets/icons/wallet.svg').default;
const SettingIcon = require('../../assets/buttonIcon/SettingIcon.svg').default;


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
  const [settingVisible, setSettingVisible] = React.useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {setOrigin} = useOriginStore();

  const {isLoading, isError, data: myCardList = [], error} = useQuery({queryKey:['myCards'], queryFn: fetchMyCardList});
  
  useEffect(() => {
    setOrigin('MyCardMain');
  }, []);

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:24, paddingVertical:16}}>
        <Text style={{fontFamily:'Pretendard-SemiBold', fontSize:28, color:'#fff'}}>내 명함</Text>
        <View style={{flex:1}}/>
        <View style={{width:16}}/>
        <TouchableOpacity onPress={() => {setSettingVisible(!settingVisible)}}>
          {settingVisible ? 
          <View style={{paddingHorizontal:32, paddingVertical:10, backgroundColor:colors.Primary, borderRadius:50}}>
            <Text style={[textStyles.M4, {color:colors.White}]}>완료</Text>
          </View>
          :
          <SettingIcon/>
          }
        </TouchableOpacity>
      </View>
      <Carousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} data={myCardList} isFlipped={isFlipped} settingVisible={settingVisible}/>
      {/* <Button title="로그아웃" onPress={() => { logout(); console.log(isLoggedIn); }} /> */}
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
