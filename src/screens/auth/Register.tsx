import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLogin } from '../../hooks/useLogin';
import useAuthStore from '../../store/useAuthStore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, textStyles } from '../../styles/styles';
import PolicyModal from '../../components/PolicyModal';
import CustomButton from '../../components/CustomButton';
import { useSendCode } from '../../hooks/useSendCode';
import InputTextMessage from '../../components/InputTextMessage';
import { useRegister } from '../../hooks/useRegister';

const BackIcon = require('../../assets/icons/BackIcon.svg').default;
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const RegisterPage = ({title, inputItem, placeHolder, value, onChangeText, setStep, nextStep}: {title: string, inputItem: string, placeHolder: string, value: string, onChangeText: (text: string) => void, setStep: (step: number) => void, nextStep: number}) => {
  return (
    <View>
      <Text style={[textStyles.B2, {color:colors.White}]}>
        {title}
      </Text>
      <View style={{height: 32}} />
      <Text style={[textStyles.M6, {color:colors.White}]}>
        {inputItem}
      </Text>
      <TextInput
        placeholderTextColor={colors.G08}
        style={styles.input}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={{height: 40}} />
      <CustomButton title="다음" onPress={() => setStep(nextStep)} disabled={value.length == 0}/>
    </View>
  )
}

const Register: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [step, setStep] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const { mutate, error, isPending } = useRegister();

  const isEmailValid = (email: string) => {
    const emailRegEx =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return emailRegEx.test(email);
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
      navigation.navigate("Login"); // 기본 동작: 이전 화면으로 돌아가기
    } else {
      setStep(step - 1); // 이전 단계로 돌아가기
    }
    return true; // 기본 뒤로가기 동작을 막음
  };

  const handleRegister = ({email, password}: { email: string; password: string }) => {
    mutate(
      { email, password }
    );
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
    <View style={styles.container}>
      {step == 0 &&
      <RegisterPage
        title="이름을 입력해 주세요"
        inputItem="이름"
        placeHolder="예) 홍길동"
        value={name}
        onChangeText={setName}
        setStep={setStep}
        nextStep={1}
      />
      }
      {step == 1 &&
      <RegisterPage
      title="이메일을 입력해 주세요"
      inputItem="이메일 주소"
      placeHolder="예) aaa@aaa.co.kr"
      value={email}
      onChangeText={setEmail}
      setStep={setStep}
      nextStep={2}
    />
      }
      {step == 2 &&
      <View>
        <Text style={[textStyles.B2, {color:colors.White}]}>
          비밀번호를 설정해 주세요
        </Text>
        <View style={{height: 32}} />
        <Text style={[textStyles.M6, {color:colors.White}]}>
          비밀번호
        </Text>
        <TextInput
          placeholderTextColor={colors.G08}
          style={styles.input}
          placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <InputTextMessage
          validMessage={''}
          errorMessage={'비밀번호 형식이 올바르지 않습니다'}
          isValid={isValidPassword}
        />
        <View style={{height: 20}} />
        <Text style={[textStyles.M6, {color:colors.White}]}>
          비밀번호 확인
        </Text>
        <TextInput
            placeholderTextColor={colors.G08}
          style={styles.input}
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChangeText={setPasswordCheck}
          secureTextEntry={true}
        />
        <InputTextMessage
          validMessage={''}
          errorMessage={'비밀번호가 일치하지 않습니다'}
          isValid={isPasswordSame}
        />
        <View style={{height: 30}} />
        <CustomButton 
        disabled={!(isValidEmail && isValidPassword && isPasswordSame && email.length > 0 && password.length > 0 && passwordCheck.length > 0)}
        title="회원가입" 
        onPress={() => {setStep(3); handleRegister({email: email, password: password});}} />
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.Black
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.G07,
    padding: 10,
    color: colors.White,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default Register;