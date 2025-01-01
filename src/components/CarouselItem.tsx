import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, ImageBackground } from 'react-native';
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

const { width: screenWidth } = Dimensions.get('window');
const MailIcon = require('../assets/cardIcon/phone-1.svg').default;
const PhoneIcon = require('../assets/cardIcon/phone.svg').default;
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

  const data = [1, 2, 3, 4];

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
          onPress={() => navigation.navigate('CardDetail', { item })}
        >
          <View style={{width:'100%', height:'70%', padding:24, flexDirection:'row'}}>
            <View>
              <View style={{width:53, height:53}}> 
                <Image src={item.logoImg} style={{flex:1, resizeMode:'contain'}}/>
              </View>
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
              {data.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={{width:36, height:36, backgroundColor:'rgba(255,255,255, 0.05)', borderRadius:18, marginTop:12}}
                  onPress={() => console.log('링크 터치')}
                >    
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
            onPress={() => navigation.navigate('CardDetail', { item })}
          >
            <View style={{width:'100%', height:'70%', padding:24, flexDirection:'row'}}>
              <View>
                <View style={{width:53, height:53}}> 
                  <Image src={item.logoImg} style={{flex:1, resizeMode:'contain'}}/>
                </View>
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
                {data.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={{width:36, height:36, backgroundColor:'rgba(255,255,255, 0.05)', borderRadius:18, marginTop:12}}
                    onPress={() => console.log('링크 터치')}
                  >    
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
      <Animated.View style={[styles.back, backCardAnimatedStyle, { backgroundColor: '#fff' }]}>
        <View style={{width: screenWidth * 0.7, height: screenWidth, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <View style={{width: '53%', aspectRatio:1, justifyContent:'center', alignItems:'center', borderRadius:4, backgroundColor:'white'}}>
            <Image src={item.qrCodeSrc} style={{width: '86%', aspectRatio:1}}/>
            </View>
          </View>

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
