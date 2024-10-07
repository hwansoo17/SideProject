import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';;
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, textStyles } from '../../styles/styles';
import CustomButton from '../../components/CustomButton';
import { useRegister } from '../../hooks/useAuthMutation';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import RegisterPage from '../../components/RegisterPage';
import { AxiosError } from 'axios';

const BackIcon = require('../../assets/icons/BackIcon.svg').default;



const Register: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [step, setStep] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const { mutate, error, isPending, status } = useRegister();

  const isEmailValid = (email: string) => {
    if (email.length > 0) {
    const emailRegEx =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return emailRegEx.test(email);
    }
    return true;
  };
  const isPasswordValid = (password: string) => {
    if (password.length > 0) {
      // 최소 8자 이상, 최대 100자 이하
      // 최소 하나의 문자, 하나의 숫자, 하나의 기호를 포함
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
    setIsValidEmail(isEmailValid(email));
    setIsValidPassword(isPasswordValid(password));
    setIsPasswordSame(isSamePassword(password, passwordCheck));
  }, [email, password, passwordCheck]);



  const handleBackPress = () => {
    if (step === 0) {
      navigation.goBack(); // 기본 동작: 이전 화면으로 돌아가기
    } else {
      setStep(step - 1); // 이전 단계로 돌아가기
    }
    return true; // 기본 뒤로가기 동작을 막음
  };

  const handleRegister = () => {
    mutate({ name: name , email: email, password: password }, {
      onSuccess: () => {
        setStep(3);
      },
      onError: (error) => {
        Alert.alert(error.response.data.message)
      }
    });

  };

  useLayoutEffect(() => {
    // 뒤로가기 버튼을 눌렀을 때 동작할 함수
    navigation.setOptions({
      headerTitle: '',
      headerBackground: () => (
        <View style={{backgroundColor: colors.Black, flex:1}} />
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={{padding: 16}}>
          <BackIcon color={colors.White} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, step]);

  return (
    <View 
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: colors.Black
      }}>
      {step == 0 &&
      <RegisterPage
        title="이름을 입력해 주세요"
        inputData={[{category: "이름", value: name, placeHolder: "예) 홍길동", onChangeText: setName, isValid: true, errorMessage: ''}]}
        buttonTitle="다음"
        onPress={() => {setStep(1)}}
        disabled={name.length == 0}
      />
      }
      {step == 1 &&
      <RegisterPage
        title="이메일을 입력해 주세요"
        inputData={[{category: "이메일 주소", value: email, placeHolder: "예) aaa@aaa.co.kr", onChangeText: setEmail, isValid: isValidEmail, errorMessage: '이메일 형식이 올바르지 않습니다'}]}
        buttonTitle="다음"
        onPress={() => {setStep(2)}}
        disabled={!(isValidEmail && email.length > 1)}
      />
      }
      {step == 2 &&
      <View>
        <RegisterPage
          title="비밀번호를 설정해 주세요"
          inputData={
            [
              {
                category: "비밀번호", 
                value: password, 
                placeHolder: "영문, 숫자, 특수문자 조합 8자리 이상", 
                onChangeText: setPassword, 
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
          buttonTitle="회원가입"
          onPress={() => {handleRegister();}}
          disabled={!(isValidEmail && isValidPassword && isPasswordSame && email.length > 0 && password.length > 1 && passwordCheck.length > 1) || isPending}
        />
      </View>
      }
      {step == 3 &&
      <View>
        <Text>회원가입이 완료되었습니다</Text>
        <CustomButton title="완료" onPress={() => {navigation.navigate('Login');}} />
      </View>
      }
    </View>
  );
};

export default Register;