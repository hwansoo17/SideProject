import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, textStyles } from '../../styles/styles';
import CustomButton from '../../components/CustomButton';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import RegisterPage from '../../components/RegisterPage';
import { useSendCode, useVerifyCode, useResetPassword } from '../../hooks/useAuthMutation';
import CodeInput from '../../components/CodeInput';
const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const PasswordReset: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [step, setStep] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [code, setCode] = useState('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const { mutate: sendCodeMutate, isPending: isSendCodePending } = useSendCode();
  const { mutate: verifyCodeMutate, isPending: isVerifyCodePending } = useVerifyCode();
  const { mutate: resetPasswordMutate, isPending: isResetPasswordPending } = useResetPassword();
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
    console.log(code)
  }, [email, password, passwordCheck, code]);



  const handleBackPress = () => {
    if (step === 0) {
      navigation.goBack(); // 기본 동작: 이전 화면으로 돌아가기
    } 
    if (step === 1) {
      setStep(step - 1); // 이전 단계로 돌아가기
    }
    if (step === 2) {
      navigation.goBack();
    }
    return true; // 기본 뒤로가기 동작을 막음
  };

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

  const handleVerifyCode = () => {
    verifyCodeMutate({ email: email, otpInput: code }, {
      onSuccess: (data) => {
        if (data.isVerified) {
          setStep(2)
          Alert.alert('인증되었습니다');
        } else {
          Alert.alert('인증번호가 올바르지 않습니다');

        }
      },
      onError: (error) => {
        console.error(error.response?.data.message)
      },
    });
  };

  const handleResetPassword = () => {
    resetPasswordMutate({ email: email, newPassword: password, otp:code }, {
      onSuccess: (data) => {
        if (data.result == 'success') {
          Alert.alert('비밀번호가 변경되었습니다'); 
          navigation.navigate('Login');
        } else {
          Alert.alert('비밀번호 변경에 실패했습니다');
        }
      },
      onError: (error) => {
        console.error(error.response?.data.message)
      },
    });
  }

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
        title="가입하신 이메일을 입력해 주세요"
        inputData={[{category: "이메일 주소", value: email, placeHolder: "예) aaa@aaa.co.kr", onChangeText: setEmail, isValid: isValidEmail, errorMessage: '이메일 형식이 올바르지 않습니다'}]}
        buttonTitle="다음"
        onPress={() => {handleSendCode();}}
        disabled={!(isValidEmail && email.length > 1) || isSendCodePending}
      />
      }
      {step == 1 &&
      <View>
        <Text style={[textStyles.B2, {color:colors.White}]}>
          인증번호를 입력해 주세요
        </Text>
        <View style={{height: 24}} />
        <CodeInput length={6} onCodeChange={handleCodeChange} />
        <View style={{height: 24}} />
        <CustomButton title="다음" onPress={() => {handleVerifyCode()}} disabled={code.length != 6 || isVerifyCodePending} />
      </View>
      }
      {step == 2 &&
      <View>
        <RegisterPage
          title="새로운 비밀번호를 설정해 주세요"
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
          buttonTitle="완료"
          onPress={() => {handleResetPassword()}}
          disabled={!(isValidEmail && isValidPassword && isPasswordSame && email.length > 0 && password.length > 1 && passwordCheck.length > 1) || isResetPasswordPending}
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

export default PasswordReset;