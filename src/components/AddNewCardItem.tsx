import React from 'react';
import { View, StyleSheet, Dimensions, Text, ImageBackground, TouchableOpacity } from 'react-native';
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
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const AddIcon = require('../assets/buttonIcon/AddIcon.svg').default;
const { width: screenWidth } = Dimensions.get('window');

interface CarouselItemProps {
  data: any[];
  scrollX: SharedValue<number>;
  currentIndex: number;
  isFlipped: boolean;
  scrollWidth: number;

}

interface Props {
  navigation: NavigationProp<any>;
  navigate: any;
}

const AddNewCardItem: React.FC<CarouselItemProps> = ({
  data,
  scrollX,
  currentIndex,
  scrollWidth,
}) => {

  const navigation = useNavigation<Props>();

  const inputRange = [
    (data.length -1) * scrollWidth,
    data.length * scrollWidth,
    (data.length + 1) * scrollWidth,
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
        data.length * scrollWidth,
        (data.length + 0.5) * scrollWidth,
        (data.length + 1) * scrollWidth,
      ],
      [-screenWidth * 0.05, 50, -screenWidth * 0.05],
      Extrapolation.CLAMP
    );

    const marginLeft = interpolate(
      scrollX.value,
      [
        (data.length - 1) * scrollWidth,
        (data.length - 0.5) * scrollWidth,
        data.length * scrollWidth,
      ],
      [-screenWidth * 0.05, 50, -screenWidth * 0.05],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { scale },
        // { perspective: 1000 },
      ],
      marginRight: data.length === currentIndex ? marginRight : undefined,
      marginLeft: data.length === currentIndex ? marginLeft : undefined,
    };

  });

  return (
    <Animated.View
      style={[
        {
            alignSelf: 'center',
            width: screenWidth * 0.7,
            marginHorizontal: -screenWidth * 0.05,
            height:screenWidth,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: '#A1A1A1',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius:10,
            overflow: 'hidden',
        },
        animatedStyle,
      ]}
    >
      <View style={{flex:1}}/>
      <TouchableOpacity 
          style={{alignItems:'center'}}  
          onPress={() => navigation.navigate('MakeCard')}
      >
        <View 
          style={{
            width:36,
            height:36,
            alignItems:'center', 
            justifyContent:'center', 
            backgroundColor:'rgba(255,255,255,0.3)', 
            borderRadius:18}}>
          <AddIcon/>
        </View>
      </TouchableOpacity>
      <View style={{flex:1}}>
        <View style={{height:20}}/>
        <TouchableOpacity
          style={{alignItems:'center', justifyContent:'center'}}
          onPress={() => {navigation.navigate('MakeCard'); console.log('pressed')}}
        >
          <View style={{paddingVertical:10, paddingHorizontal:44, backgroundColor:'#5539FF', borderRadius:100}}>
            <Text style={{color:'#fff', fontSize:14, fontFamily:'Pretendard-Medium'}}>명함 추가하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

}

export default AddNewCardItem;
