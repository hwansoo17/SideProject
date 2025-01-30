import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, textStyles } from '../styles/styles';

const BackIcon = require('../assets/icons/BackIcon.svg').default;

interface CustomHeaderProps {
  title: string;
  subtitle?: string;
  onPressRightButton?: () => void;
  headerRight?: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title, 
  subtitle, 
  onPressRightButton,
  headerRight,
}) => {

  const navigation = useNavigation();

  return (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{padding:16, flex:1}}>
        <BackIcon color={colors.G11}/>
      </TouchableOpacity>
      <View style={{alignItems: 'center', paddingVertical:8, gap:4, flex:6}}>
        <Text style={[textStyles.M1, {color: colors.White, textAlign:'center', fontSize:18}]}>
          {title}
        </Text>
        {subtitle &&
          <Text style={[textStyles.B2, {color: colors.Black}]}>
            {subtitle}
          </Text>
        }
      </View>
      <TouchableOpacity
        onPress={onPressRightButton}
        style={{padding:16, flex:1, alignItems:'flex-end'}}>
        {headerRight}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;