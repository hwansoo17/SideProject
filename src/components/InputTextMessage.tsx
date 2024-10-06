import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {textStyles, colors} from '../styles/styles';

interface InputTextMessageProps {
  isValid: boolean;
  validMessage: string;
  errorMessage: string;
}

const InputTextMessage: React.FC<InputTextMessageProps> = ({isValid, validMessage, errorMessage}) => {
  return (
    <View style={{height: 24}}>
      {isValid ? (
        <Text style={[textStyles.M6, {color: colors.Primary}]}>
          {validMessage}
        </Text>
      ) : (
        <Text style={[textStyles.M6, {color: colors.Red}]}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputTextMessage;
