import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { textStyles, colors } from '../styles/styles';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

interface RegisterPageProps {
  title: string,
  inputData: inputData[],
  buttonTitle: string,
  onPress: () => void,
  disabled: boolean
}

type inputData = {
  category: string,
  value: string,
  placeHolder: string,
  onChangeText: (text: string) => void,
  isValid: boolean,
  errorMessage: string
  secureTextEntry?: boolean
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  title,
  inputData,
  buttonTitle,
  onPress, 
  disabled  
  }) => {

  return (
    <View>
      <Text style={[textStyles.B2, {color:colors.White}]}>
        {title}
      </Text>
      <View style={{height: 16}} />
      {inputData.map((item, index) => (
        <CustomInput
        key={index}
        category={item.category}
        value={item.value} 
        placeHolder={item.placeHolder} 
        onChangeText={item.onChangeText} 
        isValid={item.isValid} 
        errorMessage={item.errorMessage}
        secureTextEntry={item.secureTextEntry}
      />))}
      <View style={{height: 30}} />
      <CustomButton title={buttonTitle} onPress={onPress} disabled={disabled}/>
    </View>
  )
}

export default RegisterPage;