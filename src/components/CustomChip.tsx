import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { colors, textStyles } from '../styles/styles';

const CustomChip: React.FC<{text: string, isSelected: boolean, onPress: () => void }> = ({text, isSelected, onPress}) => {
  return (
    <TouchableOpacity 
      style={{
        backgroundColor: isSelected? colors.Primary : undefined , 
        borderRadius: 100, 
        paddingHorizontal:20, 
        paddingVertical:10, 
        borderColor: isSelected ? colors.Primary : 'rgba(142, 142, 151, 0.4)', 
        borderWidth: 1
      }}
      onPress={onPress}
    >
      <Text style={[textStyles.R3, {color: colors.White}]}>{text}</Text>
    </TouchableOpacity>
  );
}

export default CustomChip;