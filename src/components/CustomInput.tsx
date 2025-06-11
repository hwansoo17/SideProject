import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors, textStyles } from '../styles/styles';
import  InputTextMessage  from './InputTextMessage';

interface CustomInputProps {
  category: string;
  value: string;
  placeHolder: string;
  onChangeText: (text: string) => void;
  errorMessage: string;
  isValid: boolean;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({category, value, placeHolder, onChangeText, errorMessage, isValid, secureTextEntry}) => {
  return (
      <View>
        <View style={{height: 24}} />
        <Text style={[textStyles.M6, {color:colors.White}]}>
          {category}
        </Text>
        <TextInput
          placeholderTextColor={colors.G08}
          style={[
            textStyles.M4,
            {
            height: 49,
            paddingLeft: 4,
            borderBottomWidth: 1,
            borderColor: colors.G07,
            color: colors.White
          }]}
          placeholder={placeHolder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize = 'none'
        />
        <InputTextMessage
          validMessage={''}
          errorMessage={errorMessage}
          isValid={isValid}
        />
      </View>
  );
};

export default CustomInput;
