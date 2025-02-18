import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, ImageBackground, Linking } from 'react-native';
import { Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { colors } from '../styles/styles';

const { width: screenWidth } = Dimensions.get('window');
const MailIcon = require('../assets/cardIcon/phone-1.svg').default;
const PhoneIcon = require('../assets/cardIcon/phone.svg').default;

const XIcon = require('../assets/icons/links/x_icon.svg').default;
const KakaoIcon = require('../assets/icons/links/kakao_icon.svg').default;
const FacebookIcon = require('../assets/icons/links/facebook_icon.svg').default;
const InstagramIcon = require('../assets/icons/links/instagram_icon.svg').default;
const LinkIcon = require('../assets/icons/links/default_link_icon.svg').default;
const TrashCanIcon = require('../assets/buttonIcon/TrashCanIcon.svg').default;
interface CarouselItemProps {
  item: {
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
    qrCodeSrc: string;
  };
    scrollX: SharedValue<number>;
    currentIndex: number;
    index: number;
    isFlipped: boolean;
    scrollWidth: number;
    settingVisible?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
  navigate: any;
}
const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  scrollX,
  currentIndex,
  index,
  isFlipped,
  scrollWidth,
  settingVisible
}) => {
  const navigation = useNavigation<Props>();

  const rotateY = useSharedValue(0);

  if (isFlipped) {
    rotateY.value = withTiming(180, { duration: 500, reduceMotion: ReduceMotion.Never }); // ReduceMotion.Never 기기 애니메이션 줄이기 설정 무시
  } else {
    rotateY.value = withTiming(0, { duration: 350, reduceMotion: ReduceMotion.Never }); // 뒤집히지 않은 상태일때 0도로 애니메이션 없이 돌리기
  }

  // Calculate input range for scaling and positioning
  const inputRange = [
    ((index) - 1) * scrollWidth,
    (index) * scrollWidth,
    ((index) + 1) * scrollWidth,
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
        (index) * scrollWidth,
        ((index) + 0.5) * scrollWidth,
        ((index) + 1) * scrollWidth,
      ],
      [-screenWidth * 0.05, 50, -screenWidth * 0.05],
      Extrapolation.CLAMP
    );

    const marginLeft = interpolate(
      scrollX.value,
      [
        ((index) - 1) * scrollWidth,
        ((index) - 0.5) * scrollWidth,
        (index) * scrollWidth,
      ],
      [-screenWidth * 0.05, 50, -screenWidth * 0.05],
      Extrapolation.CLAMP
    );

    const zIndex = currentIndex === (index) ? 2 : 0;

    return {
      transform: [
        { scale },
        // { perspective: 1000 },
      ],
      marginRight: (index) === currentIndex ? marginRight : undefined,
      marginLeft: (index) === currentIndex ? marginLeft : undefined,
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
      {item.background == "COLOR" &&
      <Animated.View style={[styles.front, frontCardAnimatedStyle, { backgroundColor: item.brColor }]}>
        <TouchableWithoutFeedback 
          style={{flex:1, width: screenWidth * 0.7, height: screenWidth, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
          onPress={() => {navigation.navigate(`CardDetail`, { item });}}
          disabled={settingVisible}
        >
          <View style={{width:'100%', height:'70%', padding:16, flexDirection:'row'}}>
            <View>
              {item.logoImg &&
                <View style={{width:53, height:53, backgroundColor:'white', borderRadius:100, overflow:'hidden'}}> 
                  <Image src={item.logoImg} style={{flex:1, resizeMode:'contain'}}/>
                </View>}
              <View style={{flex:1}}/>
              <View>
                <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color: '#fff'}}>
                  {item.corporation}
                </Text>
                <View style={{height:8}}/>
                <Text style={{fontFamily: 'Pretendard-Regular', fontSize:16, color: '#f2f2f2'}}>
                  {item.title}
                </Text>
              </View>
            </View>
            <View style={{flex:1}}/>
            <View style={{justifyContent:'flex-end'}}>
              {settingVisible && (index) === currentIndex && (
                <TouchableOpacity
                  style={{width:32, height:32, borderRadius:16, backgroundColor:'rgba(0, 0, 0, 0.3)', alignItems:'center', justifyContent:'center', borderWidth:1.2, borderColor: colors.White}}
                  onPress={() => navigation.navigate('CardDetail', { item })}>
                  <TrashCanIcon width={19} height={19}/>
                </TouchableOpacity>
              )}
              <View style={{flex:1}}/>
              {item.links.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => Linking.openURL(link)}>
                  {link.startsWith('https://x.com') ? <XIcon width={36} height={36}/> :
                  link.startsWith('https://kakao.com') ? <KakaoIcon width={36} height={36}/> :
                  link.startsWith('https://facebook.com') ? <FacebookIcon width={36} height={36}/> :
                  link.startsWith('https://instagram.com') ? <InstagramIcon width={36} height={36}/> :
                  <LinkIcon width={36} height={36}/>}
                </TouchableOpacity>
              ))}
            </View>  
          </View>
          <View style={{width:'100%', height:'30%', padding:20, backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
            <Text style={{fontFamily: 'Pretendard-Medium', fontSize:18, color: '#fff'}}>
              {item.name}
            </Text>
            <View style={{flex:1}}/>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <PhoneIcon/>
              <View style={{width:4}}/>
              <Text style={{fontFamily: 'Pretendard-Light', fontSize:14, color: '#fff'}}>
                {item.tel}
              </Text>
            </View>
            <View style={{height:4}}/>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <MailIcon/>
              <View style={{width:4}}/>
              <Text style={{fontFamily: 'Pretendard-Light', fontSize:14, color: '#fff'}}>
                {item.email}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
      }
      {item.background == "IMAGE" &&
      <Animated.View style={[styles.front, frontCardAnimatedStyle, {backgroundColor: item.brColor}]}>
        <ImageBackground
          src={item.bgImg}
          style={{flex:1}}
        >
          <TouchableWithoutFeedback 
            style={{flex:1, width: screenWidth * 0.7, height: screenWidth, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
            onPress={() => {navigation.navigate(`CardDetail`, { item })}}
            disabled={settingVisible}
          >
            <View style={{width:'100%', height:'70%', padding:16, flexDirection:'row'}}>
              <View>
                {item.logoImg &&
                <View style={{width:53, height:53, backgroundColor:'white', borderRadius:100, overflow:'hidden'}}> 
                  <Image src={item.logoImg} style={{flex:1, resizeMode:'contain'}}/>
                </View>}
                <View style={{flex:1}}/>
                <View>
                  <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color: '#fff'}}>
                    {item.corporation}
                  </Text>
                  <View style={{height:8}}/>
                  <Text style={{fontFamily: 'Pretendard-Regular', fontSize:16, color: '#f2f2f2'}}>
                    {item.title}
                  </Text>
                </View>
              </View>
              <View style={{flex:1}}/>
              <View style={{justifyContent:'flex-end'}}>
                {settingVisible && (index) === currentIndex && (
                  <TouchableOpacity
                    style={{width:32, height:32, borderRadius:16, backgroundColor:'rgba(0, 0, 0, 0.3)', alignItems:'center', justifyContent:'center', borderWidth:1.2, borderColor: colors.White}}
                    onPress={() => navigation.navigate('CardDetail', { item })}>
                    <TrashCanIcon width={19} height={19}/>
                  </TouchableOpacity>
                )}
                <View style={{flex:1}}/>
                {item.links.map((link, index) => (
                  <TouchableOpacity 
                    key={index}
                    onPress={() => Linking.openURL(link)}>
                    {link.startsWith('https://x.com') ? <XIcon width={36} height={36}/> :
                    link.startsWith('https://kakao.com') ? <KakaoIcon width={36} height={36}/> :
                    link.startsWith('https://facebook.com') ? <FacebookIcon width={36} height={36}/> :
                    link.startsWith('https://instagram.com') ? <InstagramIcon width={36} height={36}/> :
                    <LinkIcon width={36} height={36}/>}
                  </TouchableOpacity>
                ))}
              </View>  
            </View>
            <View style={{width:'100%', height:'30%', padding:20, backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
              <Text style={{fontFamily: 'Pretendard-Medium', fontSize:18, color: '#fff'}}>
                {item.name}
              </Text>
              <View style={{flex:1}}/>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <PhoneIcon/>
                <View style={{width:4}}/>
                <Text style={{fontFamily: 'Pretendard-Light', fontSize:14, color: '#fff'}}>
                  {item.tel}
                </Text>
              </View>
              <View style={{height:4}}/>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <MailIcon/>
                <View style={{width:4}}/>
                <Text style={{fontFamily: 'Pretendard-Light', fontSize:14, color: '#fff'}}>
                  {item.email}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </Animated.View>
      }
      <Animated.View style={[styles.back, backCardAnimatedStyle, { backgroundColor: item.brColor }]}>
        <ImageBackground 
          src={item.bgImg}
          style={{width: screenWidth * 0.7, height: screenWidth}}
        >
          <View style={{alignItems:'center', justifyContent:'center', flex:1, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            <View style={{width: '53%', aspectRatio:1, justifyContent:'center', alignItems:'center', borderRadius:4, backgroundColor:'white'}}>
            <Image src={item.qrCodeSrc} style={{width: '86%', aspectRatio:1}}/>
            </View>
          </View>
        </ImageBackground>
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
