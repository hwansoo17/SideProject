import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { colors, textStyles } from '../styles/styles';

const ArrowIcon = require('../assets/icons/ArrowIcon.svg').default;

interface SettingBoardProps {
  title: string;
  buttonTitle?: string;
  onPressRightButton?: () => void;
  children?: React.ReactNode;

}

const SettingBoard: React.FC<SettingBoardProps> = ({
  title, 
  buttonTitle,
  onPressRightButton,
  children
}) => {

  return (
    <View style={{}}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 16, marginHorizontal:20}}>
        <Text style = {[textStyles.SB1, {color:colors.White, fontSize:18}]}>
          {title}
        </Text>
        {buttonTitle && 
        <TouchableOpacity
          onPress={onPressRightButton}
          style={{flexDirection:'row', alignItems:'center', gap:4}}>
          <Text style={[textStyles.M3, {color:colors.G11, fontSize:13}]}>
            {buttonTitle}
          </Text>
          <ArrowIcon width={16} height={16} color={colors.G11}/>
        </TouchableOpacity>}
      </View>
      {children}
    </View>
  );
};

export default SettingBoard;