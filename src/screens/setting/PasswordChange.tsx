import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, textStyles } from '../../styles/styles';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import RegisterPage from '../../components/RegisterPage';
import { useResetPassword } from '../../hooks/useAuthMutation';
import CustomHeader from '../../components/CustomHeader';
const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const PasswordChange: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const { mutate: resetPasswordMutate, isPending: isResetPasswordPending } = useResetPassword();

  const isPasswordValid = (password: string) => {
    if (password.length > 0) {
      const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,100}$/;
      return passwordRegEx.test(password);
    }
    return true;
  };

  const isSamePassword = (password: string, passwordCheck: string): boolean => {
    if (passwordCheck.length > 0 && password.length > 0) {
      return password === passwordCheck;
    }
    if (passwordCheck.length === 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsValidPassword(isPasswordValid(newPassword));
    setIsPasswordSame(isSamePassword(newPassword, passwordCheck));
  }, [newPassword, passwordCheck]);

  // const handleResetPassword = () => {
  //   resetPasswordMutate({ newPassword: password }, {
  //     onSuccess: (data) => {
  //       if (data.result == 'success') {
  //         Alert.alert('비밀번호가 변경되었습니다'); 
  //         navigation.navigate('Login');
  //       } else {
  //         Alert.alert('비밀번호 변경에 실패했습니다');
  //       }
  //     },
  //     onError: (error) => {
  //       console.error(error.response?.data.message)
  //     },
  //   });
  // }
  // 현재 비밀번호로 변경하는 기능으로 교체 필요

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: colors.Black
      }}>
      <CustomHeader title="비밀번호 변경" />
      <View style={{paddingHorizontal:20}}>
        <RegisterPage
          inputData={
            [
              {
                category: "현재 비밀번호", 
                value: password, 
                placeHolder: "현재 비밀번호를 입력해주세요", 
                onChangeText: setPassword, 
                isValid: true, 
                errorMessage: '',
                secureTextEntry: true
              },
              {
                category: "새 비밀번호", 
                value: newPassword, 
                placeHolder: "영문, 숫자, 특수문자 조합 8자리 이상", 
                onChangeText: setNewPassword, 
                isValid: isValidPassword, 
                errorMessage: '비밀번호 형식이 올바르지 않습니다',
                secureTextEntry: true
              },
              {
                category: "비밀번호 확인",
                value: passwordCheck,
                placeHolder: "비밀번호 확인",
                onChangeText: setPasswordCheck,
                isValid: isPasswordSame,
                errorMessage: '비밀번호가 일치하지 않습니다',
                secureTextEntry: true
              }
            ]
          }
          buttonTitle="확인"
          onPress={() => {}}
          disabled={!(isValidPassword && isPasswordSame && password.length > 1 && newPassword.length > 1 && passwordCheck.length > 1) || isResetPasswordPending}
        />
      </View>
    </View>
  );
};

export default PasswordChange;