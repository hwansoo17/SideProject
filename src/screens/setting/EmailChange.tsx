import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';;
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, textStyles } from '../../styles/styles';
import CustomButton from '../../components/CustomButton';
import { useChangeEmail, useRegister, useSendCode, useSendCodeForChangeEmail } from '../../hooks/useAuthMutation';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import RegisterPage from '../../components/RegisterPage';
import { AxiosError } from 'axios';
import CustomHeader from '../../components/CustomHeader';

const BackIcon = require('../../assets/icons/BackIcon.svg').default;



const Register: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [code, setCode] = useState('');
  const { mutate, error, isPending, status } = useChangeEmail();
  const { mutate: sendCodeMutate, isPending: isSendCodePending } = useSendCodeForChangeEmail();
  const isEmailValid = (email: string) => {
    if (email.length > 0) {
    const emailRegEx =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return emailRegEx.test(email);
    }
    return true;
  };


  useEffect(() => {
    setIsValidEmail(isEmailValid(email));
  }, [email]);


  const handleSendCode = () => {
      sendCodeMutate(email, {
        onSuccess: () => {
          setStep(1);
          Alert.alert('인증번호가 전송되었습니다');
        },
        onError: (error) => {
          console.error(error.response?.data.message)
        },
      });
    }

  const handleBackPress = () => {
    if (step === 0) {
      navigation.goBack(); // 기본 동작: 이전 화면으로 돌아가기
    } else {
      setStep(step - 1); // 이전 단계로 돌아가기
    }
    return true; // 기본 뒤로가기 동작을 막음
  };

  const handleRegister = () => {
    mutate({ newEmail:email, otpInput:code }, {
      onSuccess: () => {
        setStep(2);
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
        flex: 1,
        backgroundColor: colors.Black
      }}>
      <CustomHeader title="이메일 변경" goBack={handleBackPress} />
      <View style={{paddingHorizontal:20}}>
        {step == 0 &&
        <RegisterPage
          title="변경할 이메일을 입력해주세요"
          inputData={[{category: "이메일 주소", value: email, placeHolder: "예) aaa@aaa.co.kr", onChangeText: setEmail, isValid: isValidEmail, errorMessage: '이메일 형식이 올바르지 않습니다'}]}
          buttonTitle="인증번호 전송"
          onPress={() => {handleSendCode();}}
          disabled={!(isValidEmail && email.length > 1) || isSendCodePending}
        />
        }
        {step == 1 &&
        <RegisterPage
          title="인증번호를 입력해 주세요"
          inputData={[{category: "인증번호", value: code, placeHolder: "숫자 6자리", onChangeText: setCode, isValid: code.length == 6, errorMessage: ''}]}
          buttonTitle="다음"
          onPress={() => {handleRegister()}}
          disabled={code.length != 6 || isPending}
        />
        }
        {step == 2 &&
        <View>
          <Text style={{color:'white'}}>이메일이 성공적으로 변경되었습니다.</Text>
          <CustomButton title="완료" onPress={() => {navigation.navigate('SettingMain');}} />
        </View>
        }
      </View>
    </View>
  );
};

export default Register;