import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, textStyles } from '../styles/styles';
import useToggleStore from '../store/useToggleStore';

const ToggleSegment = () => {// 기본 선택: 모바일
  const { selectedOption, setSelectedOption } = useToggleStore();
  return (
    <View style={{alignItems:'center'}}>
      <View style={{backgroundColor:colors.G02, padding:4, flexDirection:'row', borderRadius:100}}>
        {/* 모바일 버튼 */}
        <TouchableOpacity 
          style={{paddingVertical:6, paddingHorizontal:12, borderRadius:100, backgroundColor: selectedOption === '모바일' ? colors.Primary : colors.G02}} 
          onPress={() => setSelectedOption('모바일')}
          activeOpacity={0.8}
        >
          <Text style={[textStyles.R3,{color:colors.White}]}>
            모바일
          </Text>
        </TouchableOpacity>

        {/* 실물 버튼 */}
        <TouchableOpacity 
          style={{paddingVertical:6, paddingHorizontal:18, borderRadius:100, backgroundColor: selectedOption === '실물' ? colors.Primary : colors.G02}} 
          onPress={() => setSelectedOption('실물')}
          activeOpacity={0.8}
        >
          <Text style={[textStyles.R3,{color:colors.White}]}>
            실물
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ToggleSegment;
