import React from 'react';
import {
  Text,
  Pressable,
} from 'react-native';
import { textStyles, colors } from '../styles/styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress, disabled = false, style, textStyle}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          height: 50,
          backgroundColor: disabled
            ? colors.G09
            : pressed
            ? colors.Primary
            : colors.Primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        },
        style,
      ]}
      disabled={disabled}
      onPress={onPress}>
      {({pressed}) => (
        <Text
          style={[
            textStyles.M4,
            {color: disabled ? 'white' : 'white'},
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
